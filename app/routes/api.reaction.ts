import { Agent } from "@atproto/api";
import type { ActionFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { AppNetlifyStellarbskyReaction } from "~/generated/api";
import { TID } from "@atproto/common";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  switch (request.method) {
    case "POST": {
      const body = await request.json();

      const record: AppNetlifyStellarbskyReaction.Record = {
        subject: {
          uri: body.subject.uri,
          cid: body.subject.cid,
        },
        emoji: { rkey: body.rkey, repo: body.repo },
        authorDid: agent.assertDid,
      };

      if (
        !AppNetlifyStellarbskyReaction.isRecord(record) &&
        !AppNetlifyStellarbskyReaction.validateRecord(record)
      )
        return new Response(null, { status: 400 });

      const rkey = TID.nextStr();

      await agent.com.atproto.repo.putRecord({
        collection: "app.netlify.stellarbsky.reaction",
        repo: agent.assertDid,
        rkey: rkey,
        record: record,
      });

      return { rkey };
    }

    case "DELETE": {
      const body = await request.json();

      await agent.com.atproto.repo.deleteRecord({
        collection: "app.netlify.stellarbsky.reaction",
        repo: agent.assertDid,
        rkey: body.rkey,
      });

      return { ok: true };
    }
  }
};
