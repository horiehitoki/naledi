import { Agent } from "@atproto/api";
import { ActionFunction, json } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { prisma } from "~/utils/db/prisma";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const body = await request.json();

  await prisma.reaction.delete({
    where: { id: body.rkey },
  });

  await agent.com.atproto.repo.deleteRecord({
    repo: agent.assertDid,
    collection: "com.marukun-dev.pds.reaction",
    rkey: body.rkey,
  });

  return json({ ok: true });
};
