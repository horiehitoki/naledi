import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { FeedViewPostWithReaction } from "~/components/timeline/timeline";
import { getSessionAgent } from "~/lib/auth/session";
import feedWithReaction from "~/lib/feed/feedWithReactions";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  try {
    const cursor: string = getParams(request, "cursor");
    const did: string = getParams(request, "did");

    let timeline;

    if (did) {
      // 特定ユーザーの投稿を取得
      timeline = await agent.getAuthorFeed({
        actor: did,
        cursor: cursor,
        limit: 20,
      });
    } else {
      // ホームタイムラインを取得
      timeline = await agent.getTimeline({
        cursor: cursor,
        limit: 20,
      });
    }

    //リアクションデータを取得
    const feed: FeedViewPostWithReaction[] = await feedWithReaction(
      timeline.data.feed
    );

    return Response.json({
      ...timeline.data,
      feed,
    });
  } catch (e) {
    console.log(e);

    return new Response(
      JSON.stringify({ error: "タイムラインの取得に失敗しました。" }),
      {
        status: 500,
      }
    );
  }
};
