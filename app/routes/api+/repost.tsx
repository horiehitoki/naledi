import { Agent } from "@atproto/api";
import type { ActionFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  switch (request.method) {
    case "POST": {
      try {
        const body = await request.json();

        const res = await agent.repost(body.uri, body.cid);

        return Response.json({ uri: res.uri });
      } catch (e) {
        console.log(e);

        return new Response(
          JSON.stringify({ error: "リポストに失敗しました。" }),
          {
            status: 500,
          }
        );
      }
    }

    case "DELETE": {
      try {
        const body = await request.json();

        await agent.deleteRepost(body.repostUri);

        return Response.json({ ok: true });
      } catch (e) {
        console.log(e);

        return new Response(
          JSON.stringify({ error: "リポストの取り消しに失敗しました。" }),
          {
            status: 500,
          }
        );
      }
    }
  }
};
