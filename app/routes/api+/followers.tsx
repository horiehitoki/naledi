import { Agent } from "@atproto/api";
import { json, LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const cursor = getParams(request, "cursor");
  const did = getParams(request, "did");

  const followers = await agent.getFollowers({
    actor: did,
    limit: 50,
    cursor: cursor,
  });

  return json({
    data: followers.data.followers,
    cursor: followers.data.cursor,
  });
};
