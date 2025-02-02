import { LoaderFunction } from "@remix-run/node";
import { BlueMarilStellarGetReactions } from "~/generated/api";
import { prisma } from "~/lib/db/prisma";
import { getParams } from "~/utils/getParams";
import { ReactionWithEmoji } from "./[blue.maril.stellar.getActorReactions]";
import { Agent } from "@atproto/api";

const agent = new Agent("https://public.api.bsky.app");

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const uri: string = getParams(request, "uri");
    const cid: string = getParams(request, "cid");
    const cursor: string = getParams(request, "cursor");
    const limit = parseInt(getParams(request, "limit") ?? "20");

    if (!uri) {
      return new Response(
        JSON.stringify({ error: "Missing required parameter: uri" }),
        { status: 400 }
      );
    }

    if (limit < 1 || limit > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid limit: must be between 1 and 100" }),
        {
          status: 400,
        }
      );
    }

    const where: {
      post_uri: string;
      post_cid?: string;
      rkey?: { gt: string };
    } = {
      post_uri: uri,
    };

    if (cid) {
      where.post_cid = cid;
    }

    let reactions: ReactionWithEmoji[];

    if (cursor) {
      reactions = await prisma.reaction.findMany({
        where,
        cursor: { rkey: cursor },
        take: limit + 1,
        skip: 1,
        orderBy: { rkey: "desc" },
        include: { emoji: true },
      });
    } else {
      reactions = await prisma.reaction.findMany({
        where,
        take: limit + 1,
        orderBy: { rkey: "desc" },
        include: { emoji: true },
      });
    }

    const hasMore = reactions.length > limit;

    //余分な1件を削除
    if (hasMore) {
      reactions.pop();
    }

    //リアクションデータの整形
    const transformedReactions: BlueMarilStellarGetReactions.Reaction[] =
      await Promise.all(
        reactions.map(async (reaction) => {
          const profile = await agent.getProfile({ actor: reaction.authorDid });

          return {
            rkey: reaction.rkey,
            subject: { uri: reaction.post_uri, cid: reaction.post_cid },
            createdAt:
              reaction.createdAt?.toISOString() ?? new Date().toISOString(),
            emojiRef: JSON.parse(reaction.record).emoji,
            emoji: JSON.parse(reaction.emoji.record),
            actor: profile.data,
          };
        })
      );

    //レスポンス
    const response: BlueMarilStellarGetReactions.OutputSchema = {
      uri,
      ...(cid && { cid }),
      ...(hasMore && { cursor: reactions[reactions.length - 1].rkey }),
      reactions: transformedReactions,
    };

    return Response.json(response);
  } catch (error) {
    console.error("Err:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
