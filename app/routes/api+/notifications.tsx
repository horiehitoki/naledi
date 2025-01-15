import { Agent } from "@atproto/api";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");

  try {
    const res = await agent.listNotifications({
      limit: 50,
      cursor: cursor || undefined,
    });
    return Response.json(res.data);
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ error: "通知の取得に失敗しました。" }),
      {
        status: 500,
      }
    );
  }
};

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  try {
    await agent.updateSeenNotifications();

    return Response.json({ success: true });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "既読の更新に失敗しました。" }),
      { status: 500 }
    );
  }
};
