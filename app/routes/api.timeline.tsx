import { Agent } from "@atproto/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Reaction } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { prisma } from "~/lib/db/prisma";
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

    const feedWithReactions = await Promise.all(
      timeline.data.feed.map(async (post: FeedViewPost) => {
        const reactions: Reaction[] = await prisma.reaction.findMany({
          where: { uri: post.post.uri, cid: post.post.cid },
        });

        return {
          ...post,
          reactions: reactions,
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

    const feedWithReactions = await Promise.all(
      timeline.data.feed.map(async (post: FeedViewPost) => {
        const reactions: Reaction[] = await prisma.reaction.findMany({
          where: { uri: post.post.uri, cid: post.post.cid },
        });

        return {
          ...post,
          reactions: reactions,
        };
      })
    );

    return {
      ...timeline.data,
      feed: feedWithReactions,
    };
  }
};
