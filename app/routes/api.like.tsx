import { Agent } from "@atproto/api";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  const cursor = getParams(request, "cursor");
  const uri = getParams(request, "uri");

  const likes = await agent.getLikes({
    uri: uri,
    limit: 50,
    cursor: cursor,
  });

  return likes;
};

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  switch (request.method) {
    case "POST": {
      const body = await request.json();

      const res = await agent.like(body.uri, body.cid);

      return { uri: res.uri };
    }

    case "DELETE": {
      const body = await request.json();

      await agent.deleteLike(body.likeUri);

      return { ok: true };
    }
  }
};
