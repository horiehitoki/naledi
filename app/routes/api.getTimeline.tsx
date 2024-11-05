import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";

const getCursorFromRequest = (request: Request) => {
  const url = new URL(request.url);
  return url.searchParams.get("cursor") || "";
};

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return null;

  const cursor = getCursorFromRequest(request);
  const timeline = await agent.getTimeline({
    cursor: cursor,
    limit: 50,
  });

  return {
    feed: timeline.data.feed,
    cursor: timeline.data.cursor,
  };
};
