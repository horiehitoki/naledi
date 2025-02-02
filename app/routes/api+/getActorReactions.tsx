import { Agent } from "@atproto/api";
import type { LoaderFunction } from "@remix-run/node";
import { BlueMarilStellarGetActorReactions } from "~/generated/api";
import { getSessionAgent } from "~/lib/auth/session";
import { ReactionXrpc } from "~/lib/reaction/reactionXrpc";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  try {
    const cursor = getParams(request, "cursor");
    const did = getParams(request, "did");

    const xrpc = new ReactionXrpc();
    const reactions = await xrpc.getActorReaction(did, 10, cursor);

    const data: BlueMarilStellarGetActorReactions.OutputSchema = reactions.data;

    const result = await Promise.all(
      data.feed.map(async (r) => {
        const post = await agent.getPosts({
          uris: [r.subject.uri],
        });

        const reactions = await xrpc.getReactions(
          r.subject.uri,
          r.subject.cid,
          20
        );

        return {
          post: {
            post: post.data.posts[0],
            reactions: reactions.data.reactions,
          },
          ...r,
        };
      })
    );

    return Response.json({ feed: result });
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
