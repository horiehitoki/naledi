import { Agent } from "@atproto/api";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  try {
    const cursor = getParams(request, "cursor");
    const did = getParams(request, "did");

    const follow = await agent.getFollows({
      actor: did,
      limit: 50,
      cursor: cursor,
    });

    return Response.json(follow.data);
  } catch (e) {
    console.log(e);

    return new Response(
      JSON.stringify({ error: "フォローの取得に失敗しました。" }),
      {
        status: 500,
      }
    );
  }
};

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  switch (request.method) {
    case "POST": {
      try {
        const body = await request.json();

        const res = await agent.follow(body.did);

        return Response.json({ uri: res.uri });
      } catch (e) {
        console.log(e);

        return new Response(
          JSON.stringify({ error: "フォローに失敗しました。" }),
          {
            status: 500,
          }
        );
      }
    }

    case "DELETE": {
      try {
        const body = await request.json();

        await agent.deleteFollow(body.followUri);

        return Response.json({ ok: true });
      } catch (e) {
        console.log(e);

        return new Response(
          JSON.stringify({ error: "フォローの取り消しに失敗しました。" }),
          {
            status: 500,
          }
        );
      }
    }
  }
};
