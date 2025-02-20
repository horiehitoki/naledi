import AtpAgent from "@atproto/api";
import { BlueMarilStellarReaction } from "../../../../types/atmosphere";
import { putATRecords, removeATRecords } from "../atmosphere/record";

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

export async function getActorReaction(
  actor: string,
  limit: number,
  cursor?: string | null
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STELLAR_APPVIEW_URL}/xrpc/blue.maril.stellar.getActorReactions?actor=${
        actor
      }&limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`
    );

    const json = await res.json();

    return { data: json };
  } catch (e) {
    console.log(e);

    return { data: [] };
  }
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
