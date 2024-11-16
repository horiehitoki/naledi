import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return;

  const reactions = await agent.com.atproto.repo.listRecords({
    repo: agent.assertDid,
    collection: "com.marukun-dev.pds.reaction",
  });

  return { reactions };
};
