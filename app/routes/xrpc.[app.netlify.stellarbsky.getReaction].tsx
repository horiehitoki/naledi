import { Agent } from "@atproto/api";
import { Reaction } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { prisma } from "~/lib/db/prisma";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response("Unauthorized", { status: 401 });

  const uri = getParams(request, "uri");
  const cid: string | null = getParams(request, "cid");

  if (!uri) {
    return new Response("URI is required", { status: 400 });
  }

  const reactions: Reaction[] = await prisma.reaction.findMany({
    where: { uri: uri, cid: cid },
  });

  return reactions;
};
