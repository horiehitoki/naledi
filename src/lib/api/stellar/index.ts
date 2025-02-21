import AtpAgent from "@atproto/api";
import {
  BlueMarilStellarGetActorReactions,
  BlueMarilStellarReaction,
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
      `${process.env.NEXT_PUBLIC_STELLAR_APPVIEW_URL}/xrpc/blue.maril.stellar.getReactions?uri=${
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
    `${process.env.NEXT_PUBLIC_STELLAR_APPVIEW_URL}/xrpc/blue.maril.stellar.getActorReactions?actor=${
      did.data.did
    }${cursor ? `&cursor=${cursor}` : ""}`
  );

  const data =
    (await res.json()) as BlueMarilStellarGetActorReactions.OutputSchema;

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

  return { data: { feed: result } };
}

export async function getEmojis(
  limit: number,
  cursor?: string | null,
  did?: string | null
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STELLAR_APPVIEW_URL}/xrpc/blue.maril.stellar.getEmojis?limit=${limit}${did ? `&did=${did}` : ""}${cursor ? `&cursor=${cursor}` : ""}`
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
  const record: BlueMarilStellarReaction.Record = {
    subject: {
      uri: target.uri,
      cid: target.cid,
    },
    emoji: subject,
  };

  if (
    !BlueMarilStellarReaction.isRecord(record) &&
    !BlueMarilStellarReaction.validateRecord(record)
  )
    return new Response(null, { status: 400 });

  if (tid) {
    //リアクションレコードを作成
    await putATRecords(
      agent.assertDid,
      "blue.maril.stellar.reaction",
      agent,
      tid,
      record
    );
  }
}

export async function removeReaction(agent: AtpAgent, rkey: string) {
  await removeATRecords(
    agent.assertDid,
    "blue.maril.stellar.reaction",
    agent,
    rkey
  );
}
