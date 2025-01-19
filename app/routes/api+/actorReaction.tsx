import type { LoaderFunction } from "@remix-run/node";
import { ReactionXrpc } from "~/lib/reaction/reactionXrpc";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const cursor = getParams(request, "cursor");
    const did = getParams(request, "did");

    const xrpc = new ReactionXrpc();
    const reactions = await xrpc.getActorReaction(did, 50, cursor);

    return Response.json(reactions.data);
  } catch (e) {
    console.log(e);

    return new Response(
      JSON.stringify({ error: "リアクションの取得に失敗しました。" }),
      {
        status: 500,
      }
    );
  }
};
