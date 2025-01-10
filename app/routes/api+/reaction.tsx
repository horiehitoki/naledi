import { Agent } from "@atproto/api";
import type { ActionFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { ComMarukunDevStellarReaction } from "~/generated/api";
import { TID } from "@atproto/common";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  switch (request.method) {
    case "POST": {
      try {
        const body = await request.json();

        const record: ComMarukunDevStellarReaction.Record = {
          subject: {
            uri: body.subject.uri,
            cid: body.subject.cid,
          },
          emoji: { rkey: body.rkey, repo: body.repo },
          authorDid: agent.assertDid,
        };

        if (
          !ComMarukunDevStellarReaction.isRecord(record) &&
          !ComMarukunDevStellarReaction.validateRecord(record)
        )
          return new Response(null, { status: 400 });

        const rkey = TID.nextStr();

        await agent.com.atproto.repo.putRecord({
          collection: "com.marukun-dev.stellar.reaction",
          repo: agent.assertDid,
          rkey: rkey,
          record: record,
        });

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

        await agent.com.atproto.repo.deleteRecord({
          collection: "com.marukun-dev.stellar.reaction",
          repo: agent.assertDid,
          rkey: body.rkey,
        });

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
