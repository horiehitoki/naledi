import { Agent } from "@atproto/api";
import { json, LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { getParams } from "~/utils/getParams";
import { ReactionAgent } from "~/utils/reactions/reactionAgent";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const cursor: string = getParams(request, "cursor");

  const did: string = getParams(request, "did");
  const reactionAgent = new ReactionAgent(agent);

  if (did) {
    //特定ユーザーの投稿を取得
    const timeline = await agent.getAuthorFeed({
      actor: did,
      cursor: cursor,
      limit: 20,
    });

    //タイムラインからリアクション情報を取得
    const data = await reactionAgent.getReactions({
      posts: timeline.data.feed,
    });

    return json({
      data,
      cursor: timeline.data.cursor,
    });
  } else {
    //ホームタイムラインを取得
    const timeline = await agent.getTimeline({
      cursor: cursor,
      limit: 20,
    });

    //タイムラインからリアクション情報を取得
    const data = await reactionAgent.getReactions({
      posts: timeline.data.feed,
    });

    return json({
      data,
      cursor: timeline.data.cursor,
    });
  }
};
