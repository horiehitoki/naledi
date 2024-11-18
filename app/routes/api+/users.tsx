import { Agent } from "@atproto/api";
import { json, LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const cursor = getParams(request, "cursor");
  const did = getParams(request, "did");

  const timeline = await agent.getAuthorFeed({
    actor: did,
    cursor: cursor,
    limit: 20,
  });

  return json({
    data: timeline.data.feed,
    cursor: timeline.data.cursor,
  });
};
