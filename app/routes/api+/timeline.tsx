import { Agent } from "@atproto/api";
import { Reaction } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { PostData } from "@types";
import { FeedViewPost } from "~/generated/api/types/app/bsky/feed/defs";
import { getSessionAgent } from "~/utils/auth/session";
import { prisma } from "~/utils/db/prisma";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const cursor: string = getParams(request, "cursor");

  const did: string = getParams(request, "did");

  if (did) {
    //特定ユーザーの投稿を取得
    const timeline = await agent.getAuthorFeed({
      actor: did,
      cursor: cursor,
      limit: 20,
    });

    //リアクションデータ付きで返す
    const data: PostData[] = await Promise.all(
      timeline.data.feed.map(async (post: FeedViewPost) => {
        const reaction: Reaction[] = await prisma.reaction.findMany({
          where: {
            uri: post.post.uri,
          },
        });

        return { post, reaction };
      })
    );

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

    //リアクションデータ付きで返す
    const data: PostData[] = await Promise.all(
      timeline.data.feed.map(async (post: FeedViewPost) => {
        const reaction: Reaction[] = await prisma.reaction.findMany({
          where: {
            uri: post.post.uri,
          },
        });

        return { post, reaction };
      })
    );

    return json({
      data,
      cursor: timeline.data.cursor,
    });
  }
};
