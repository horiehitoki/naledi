import { Agent } from "@atproto/api";
import { ActionFunction, json } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { prisma } from "~/utils/db/prisma";
import { ReactionAgent } from "~/utils/reactions/reactionAgent";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const body = await request.json();

  const reactionAgent = new ReactionAgent(agent);

  //楽観的更新
  await prisma.reaction.delete({
    where: { id: body.rkey },
  });

  await reactionAgent.delete({
    rkey: body.rkey,
  });

  return json({ ok: true });
};
