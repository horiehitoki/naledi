import { Agent } from "@atproto/api";
import type { LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  try {
    const cursor = getParams(request, "cursor");
    const did = getParams(request, "did");

    const follower = await agent.getFollowers({
      actor: did,
      limit: 50,
      cursor: cursor,
    });

    return Response.json(follower.data);
  } catch (e) {
    console.log(e);

    return new Response(
      JSON.stringify({ error: "フォロワーの取得に失敗しました。" }),
      {
        status: 500,
      }
    );
  }
};
