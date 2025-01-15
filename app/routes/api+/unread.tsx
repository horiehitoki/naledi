import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  try {
    const res = await agent.countUnreadNotifications();
    return Response.json(res.data);
  } catch (e) {
    console.log(e);
    return null;
  }
};
