import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  const uri = getParams(request, "uri");
  if (!uri) {
    return new Response("URI is required", { status: 400 });
  }

  const cid: string | null = getParams(request, "cid");
  const cursor: string | null = getParams(request, "cursor");
  const limit: string | null = getParams(request, "limit");
};
