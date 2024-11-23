import { Agent } from "@atproto/api";
import { json, LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { getParams } from "~/utils/getParams";
import { ReactionAgent } from "~/utils/reactions/reactionAgent";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const cursor = getParams(request, "cursor");
  const uri = getParams(request, "uri");

  const reactionAgent = new ReactionAgent(agent);

  const reactions = await reactionAgent.getReactions({
    uri: uri,
    limit: 50,
    cursor: cursor,
  });

  console.log(reactions);

  return json({
    ok: true,
  });
};
