import { Agent } from "@atproto/api";
import { json, LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";

const getCursorFromRequest = (request: Request) => {
  const url = new URL(request.url);
  return url.searchParams.get("cursor") || "";
};

const getUriFromRequest = (request: Request) => {
  const url = new URL(request.url);
  return url.searchParams.get("uri") || "";
};

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const cursor = getCursorFromRequest(request);
  const uri = getUriFromRequest(request);

  const likes = await agent.getLikes({
    uri: uri,
    limit: 50,
    cursor: cursor,
  });

  return json({
    data: likes.data.likes,
    cursor: likes.data.cursor,
  });
};
