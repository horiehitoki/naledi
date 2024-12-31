import { Reaction } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/lib/db/prisma";
import { getParams } from "~/utils/getParams";
import { Agent } from "@atproto/api";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const uri: string = getParams(request, "uri");
    const cid: string = getParams(request, "cid");
    const cursor: string = getParams(request, "cursor");
    const limit = parseInt(getParams(request, "limit") ?? "50");

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

    const take = limit + 1;

    if (cursor) {
      where.rkey = { gt: cursor };
    }

    const reactions = await prisma.reaction.findMany({
      where,
      take,
      orderBy: { rkey: "asc" },
    });

    const hasMore = reactions.length > limit;

    if (hasMore) {
      reactions.pop();
    }

    const transformedReactions = await Promise.all(
      reactions.map(async (reaction: Reaction) => {
        const agent = new Agent("https://public.api.bsky.app");

        const actor = await agent.getProfile({ actor: reaction.authorDid });

        return {
          rkey: reaction.rkey,
          subject: { uri: reaction.post_uri, cid: reaction.post_cid },
          createdAt:
            reaction.createdAt?.toISOString() ?? new Date().toISOString(),
          record: reaction.record,
          actor,
        };
      })
    );

    const response = {
      uri,
      ...(cid && { cid }),
      ...(hasMore && { cursor: reactions[reactions.length - 1].rkey }),
      reactions: transformedReactions,
    };

    return response;
  } catch (error) {
    console.error("Err:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
