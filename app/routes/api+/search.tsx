import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import feedWithReaction from "~/lib/feed/feedWithReactions";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  try {
    const cursor: string = getParams(request, "cursor");
    const query: string = getParams(request, "query");

    if (!query) {
      return new Response(
        JSON.stringify({ error: "検索クエリが指定されていません。" }),
        { status: 400 }
      );
    }

    // 検索結果の投稿を取得
    const timeline = await agent.app.bsky.feed.searchPosts({
      q: query,
      cursor: cursor ?? undefined,
    });

    // リアクションデータを取得
    const postsWithReactions = await feedWithReaction(
      timeline.data.posts,
      agent
    );

    return Response.json({
      ...timeline.data,
      posts: postsWithReactions,
    });
  } catch (e) {
    console.log(e);

    return new Response(
      JSON.stringify({ error: "投稿の検索に失敗しました。" }),
      {
        status: 500,
      }
    );
  }
};
