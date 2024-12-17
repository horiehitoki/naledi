import { Agent } from "@atproto/api";
import type { ActionFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  switch (request.method) {
    case "POST": {
      const body = await request.json();

      const res = await agent.repost(body.uri, body.cid);

      return { uri: res.uri };
    }

    case "DELETE": {
      const body = await request.json();

      await agent.deleteRepost(body.repostUri);

      return { ok: true };
    }
  }
};
