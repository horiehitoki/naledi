import AtpAgent from "@atproto/api";
import {
  OrgGunjoNalediGetActorReactions,
  OrgGunjoNalediReaction,
} from "../../../../types/atmosphere";
import { putATRecords, removeATRecords } from "../atmosphere/record";
import { FeedViewPostWithReaction } from "../../../../types/feed";

export async function getReactions(
  uri: string,
  cid: string,
  limit: number,
  cursor?: string | null
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NALEDI_APPVIEW_URL}/xrpc/org.gunjo.naledi.getReactions?uri=${
        uri
      }&cid=${cid}&limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`
    );

    const json = await res.json();

    return { data: json };
  } catch (e) {
    console.log(e);
    return { data: [] };
  }
}

export async function getActorReactions(
  agent: AtpAgent,
  actor: string,
  cursor?: string | null
) {
  const did = await agent.resolveHandle({ handle: actor });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NALEDI_APPVIEW_URL}/xrpc/org.gunjo.naledi.getActorReactions?actor=${
      did.data.did
    }${cursor ? `&cursor=${cursor}` : ""}`
  );

  const data =
    (await res.json()) as OrgGunjoNalediGetActorReactions.OutputSchema;

  //整形
  const result: FeedViewPostWithReaction[] = await Promise.all(
    data.feed.map(async (r) => {
      const post = await agent.getPosts({
        uris: [r.subject.uri],
      });

      const reactions = await getReactions(r.subject.uri, r.subject.cid, 20);

      return {
        post: post.data.posts[0],
        reactions: reactions.data.reactions,
      };
    })
  );

  return { data: { feed: result, cursor: data.cursor } };
}

export async function getEmojis(
  limit: number,
  cursor?: string | null,
  did?: string | null
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NALEDI_APPVIEW_URL}/xrpc/org.gunjo.naledi.getEmojis?limit=${limit}${did ? `&did=${did}` : ""}${cursor ? `&cursor=${cursor}` : ""}`
    );

    const json = await res.json();

    return { data: json };
  } catch (e) {
    console.log(e);

    return { data: [] };
  }
}

export async function reaction(
  agent: AtpAgent,
  target: { uri: string; cid: string },
  subject: { rkey: string; repo: string },
  tid: string
) {
  const record: OrgGunjoNalediReaction.Record = {
    subject: {
      uri: target.uri,
      cid: target.cid,
    },
    emoji: subject,
  };

  if (
    !OrgGunjoNalediReaction.isRecord(record) &&
    !OrgGunjoNalediReaction.validateRecord(record)
  )
    return new Response(null, { status: 400 });

  if (tid) {
    //リアクションレコードを作成
    await putATRecords(
      agent.assertDid,
      "org.gunjo.naledi.reaction",
      agent,
      tid,
      record
    );
  }
}

export async function removeReaction(agent: AtpAgent, rkey: string) {
  await removeATRecords(
    agent.assertDid,
    "org.gunjo.naledi.reaction",
    agent,
    rkey
  );
}
