import { Agent } from "@atproto/api";
import type { ActionFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { BlueMarilStellarReaction } from "~/generated/api";
import { ReactionAgent } from "~/lib/reaction/reactionAgent";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });
  const reactionAgent = new ReactionAgent(agent);

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
