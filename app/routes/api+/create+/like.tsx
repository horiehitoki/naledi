import { Agent } from "@atproto/api";
import { ActionFunction, json } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const body = await request.json();

  const res = await agent.like(body.uri, body.cid);

  return json({ uri: res.uri });
};
