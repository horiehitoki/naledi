import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/lib/db/prisma";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const actor = getParams(request, "actor");
    const cursor = getParams(request, "cursor");
    const limit = parseInt(getParams(request, "limit") ?? "50");

    if (!actor) {
      return new Response(
        JSON.stringify({ error: "Missing required parameter: actor" }),
        { status: 400 }
      );
    }

    if (limit < 1 || limit > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid limit: must be between 1 and 100" }),
        { status: 400 }
      );
    }

    //ページネーション
    const where: {
      authorDid: string;
      rkey?: { gt: string };
    } = {
      authorDid: actor,
    };

    if (cursor) {
      where.rkey = { gt: cursor };
    }

    const reactions = await prisma.reaction.findMany({
      where,
      take: limit + 1,
      orderBy: { rkey: "desc" },
    });

    const hasMore = reactions.length > limit;
    if (hasMore) {
      reactions.pop();
    }

    const agent = new Agent("https://public.api.bsky.app");

    //feedの整形
    const feed = await Promise.all(
      reactions.map(async (reaction) => {
        const post = await agent.app.bsky.feed.getPosts({
          uris: [reaction.post_uri],
        });

        return {
          post: post.data.posts[0],
          reaction: {
            rkey: reaction.rkey,
            subject: {
              uri: reaction.post_uri,
              cid: reaction.post_cid,
            },
            createdAt:
              reaction.createdAt?.toISOString() ?? new Date().toISOString(),
            emojiRef: JSON.parse(reaction.record).emoji,
            emoji: JSON.parse(reaction.emoji),
            actor: JSON.parse(reaction.actor).data,
          },
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
