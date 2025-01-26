import { Agent } from "@atproto/api";
import { Emoji, Reaction } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { FeedViewPostWithReaction } from "~/components/timeline/timeline";
import { getSessionAgent } from "~/lib/auth/session";
import { prisma } from "~/lib/db/prisma";
import { ReactionXrpc } from "~/lib/reaction/reactionXrpc";
import { getParams } from "~/utils/getParams";

export type ReactionWithEmoji = Reaction & { emoji: Emoji };

//TODO そのうちカスタムフィードにする
export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  try {
    const cursor = getParams(request, "cursor");

    const limit = 50;

    let reactions: ReactionWithEmoji[];

    if (cursor) {
      reactions = await prisma.reaction.findMany({
        cursor: { rkey: cursor },
        take: limit + 1,
        skip: 1,
        orderBy: { rkey: "desc" },
        include: { emoji: true },
      });
    } else {
      reactions = await prisma.reaction.findMany({
        take: limit + 1,
        orderBy: { rkey: "desc" },
        include: { emoji: true },
      });
    }

    const hasMore = reactions.length > limit;
    if (hasMore) {
      reactions.pop();
    }

    //feedの整形
    const feed: FeedViewPostWithReaction[] = await Promise.all(
      reactions.map(async (reaction) => {
        const post = await agent.getPosts({
          uris: [reaction.post_uri],
        });

        const xrpc = new ReactionXrpc();

        const data = await xrpc.getReactions(
          reaction.post_uri,
          reaction.post_cid,
          50
        );

        return {
          post: post.data.posts[0],
          reactions: data.data.reactions,
        };
      })
    );

    const response = {
      feed,
      ...(hasMore && { cursor: reactions[reactions.length - 1].rkey }),
    };

    return Response.json(response);
  } catch (error) {
    console.error("Err:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      { status: 500 }
    );
  }
};
