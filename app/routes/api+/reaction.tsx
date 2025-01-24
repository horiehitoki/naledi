import { Agent } from "@atproto/api";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import {
  BlueMarilStellarGetReactions,
  BlueMarilStellarReaction,
} from "~/generated/api";
import { ReactionAgent } from "~/lib/reaction/reactionAgent";
import { getParams } from "~/utils/getParams";
import { ReactionXrpc } from "~/lib/reaction/reactionXrpc";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  try {
    const cursor = getParams(request, "cursor");
    const uri = getParams(request, "uri");
    const cid = getParams(request, "cid");

    const xrpc = new ReactionXrpc();
    const reactions = await xrpc.getReactions(uri, cid, 50, cursor);

    const data: BlueMarilStellarGetReactions.OutputSchema = reactions.data;

    if (data.cursor) {
      return Response.json({ feed: data.reactions, cursor: data.cursor });
    }

    return Response.json({ feed: data.reactions });
  } catch (e) {
    console.log(e);

    return new Response(
      JSON.stringify({ error: "リアクションの取得に失敗しました。" }),
      {
        status: 500,
      }
    );
  }
};

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });
  const reactionAgent = new ReactionAgent(agent);

  //リアクション
  switch (request.method) {
    case "POST": {
      try {
        const body = await request.json();

        const record: BlueMarilStellarReaction.Record = {
          subject: {
            uri: body.subject.uri,
            cid: body.subject.cid,
          },
          emoji: { rkey: body.rkey, repo: body.repo },
          authorDid: agent.assertDid,
        };

        if (
          !BlueMarilStellarReaction.isRecord(record) &&
          !BlueMarilStellarReaction.validateRecord(record)
        )
          return new Response(null, { status: 400 });

        //リアクションレコードを作成
        const rkey = await reactionAgent.put(record);

        return Response.json({ rkey });
      } catch (e) {
        console.log(e);

        return new Response(
          JSON.stringify({ error: "リアクションに失敗しました。" }),
          {
            status: 500,
          }
        );
      }
    }

    //リアクションの削除
    case "DELETE": {
      try {
        const body = await request.json();

        await reactionAgent.delete(body.rkey);

        return Response.json({ ok: true });
      } catch (e) {
        console.log(e);

        return new Response(
          JSON.stringify({ error: "リアクションの取り消しに失敗しました。" }),
          {
            status: 500,
          }
        );
      }
    }
  }
};
