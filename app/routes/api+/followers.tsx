import { Agent } from "@atproto/api";
import { json, LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";

const getCursorFromRequest = (request: Request) => {
  const url = new URL(request.url);
  return url.searchParams.get("cursor") || "";
};

const getDidFromRequest = (request: Request) => {
  const url = new URL(request.url);
  return url.searchParams.get("did") || "";
};

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const cursor = getCursorFromRequest(request);
  const did = getDidFromRequest(request);

  const followers = await agent.getFollowers({
    actor: did,
    limit: 50,
    cursor: cursor,
  });

  return json({
    list: followers.data.followers,
    cursor: followers.data.cursor,
  });
};
