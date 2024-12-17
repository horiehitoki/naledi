import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  const cursor: string = getParams(request, "cursor");

  const did: string = getParams(request, "did");

  if (did) {
    //特定ユーザーの投稿を取得
    const timeline = await agent.getAuthorFeed({
      actor: did,
      cursor: cursor,
      limit: 20,
    });

    return timeline.data;
  } else {
    //ホームタイムラインを取得
    const timeline = await agent.getTimeline({
      cursor: cursor,
      limit: 20,
    });

    return timeline.data;
  }
};
