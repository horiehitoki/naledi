import { Agent } from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { LoaderFunction } from "@remix-run/node";
import { Reaction } from "~/generated/api/types/app/netlify/stellarbsky/getReaction";
import { getSessionAgent } from "~/lib/auth/session";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  const cursor: string = getParams(request, "cursor");
  const did: string = getParams(request, "did");

  if (did) {
    // 特定ユーザーの投稿を取得
    const timeline = await agent.getAuthorFeed({
      actor: did,
      cursor: cursor,
      limit: 20,
    });

    //リアクションデータを取得
    const feedWithReactions = await Promise.all(
      timeline.data.feed.map(async (post: FeedViewPost) => {
        const res = await fetch(
          `${process.env.APPVIEW_URL}/xrpc/app.netlify.stellarbsky.getReaction?uri=${post.post.uri}&cid=${post.post.cid}&limit=50`
        );

        const json: { reactions: Reaction[] } = await res.json();

        return {
          ...post,
          reactions: json.reactions,
        };
      })
    );

    return {
      ...timeline.data,
      feed: feedWithReactions,
    };
  } else {
    // ホームタイムラインを取得
    const timeline = await agent.getTimeline({
      cursor: cursor,
      limit: 20,
    });

    //リアクションデータを取得
    const feedWithReactions = await Promise.all(
      timeline.data.feed.map(async (post: FeedViewPost) => {
        const res = await fetch(
          `${process.env.APPVIEW_URL}/xrpc/app.netlify.stellarbsky.getReaction?uri=${post.post.uri}&cid=${post.post.cid}&limit=50`
        );

        const json: { reactions: Reaction[] } = await res.json();

        return {
          ...post,
          reactions: json.reactions,
        };
      })
    );

    return {
      ...timeline.data,
      feed: feedWithReactions,
    };
  }
};
