import type { LoaderFunction } from "@remix-run/node";
import { ActorReaction } from "~/generated/api/types/blue/maril/stellar/getActorReactions";
import { ReactionXrpc } from "~/lib/reaction/reactionXrpc";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const cursor = getParams(request, "cursor");
    const did = getParams(request, "did");

    const xrpc = new ReactionXrpc();
    const reactions = await xrpc.getActorReaction(did, 50, cursor);

    const result: ActorReaction = reactions.data;

    return Response.json(result);
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
