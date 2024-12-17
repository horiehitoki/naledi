import { Agent } from "@atproto/api";
import type { ActionFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { TID } from "@atproto/common";
import {
  isRecord,
  validateRecord,
} from "~/generated/api/types/app/netlify/stellarbsky/reaction";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  switch (request.method) {
    case "POST": {
      const body = await request.json();

      const rkey = TID.nextStr();

      const record = {
        subject: {
          uri: body.subject.uri,
          cid: body.subject.cid,
        },
        emoji: body.emoji,
        authorDid: agent.assertDid,
      };

      if (!isRecord(record) && !validateRecord(record))
        return new Response(null, { status: 400 });

      await agent.com.atproto.repo.putRecord({
        collection: "app.netlify.stellarbsky.reaction",
        repo: agent.assertDid,
        rkey: rkey,
        record: record,
      });

      return { ok: true };
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
