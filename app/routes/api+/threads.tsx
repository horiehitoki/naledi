import { ReactionAgent } from "~/lib/agent/reactionAgent";
import { getSessionAgent } from "~/lib/auth/session";
import { getParams } from "~/utils/getParams";
import {
  PostView,
  ThreadViewPost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const agent = await getSessionAgent(request);
    if (agent == null) return new Response(null, { status: 401 });

    const uri = getParams(request, "uri");
    if (!uri) return new Response(null, { status: 404 });

    const threads = await agent.getPostThread({ uri });

    const post = threads.data.thread.post as PostView;
    const replies = threads.data.thread.replies as ThreadViewPost[];

    const reactionAgent = new ReactionAgent(agent);

    const reactions = (await reactionAgent.get(post.uri, post.cid, 50)) ?? [];

    const postWithReactions = {
      ...post,
      reactions: reactions.data.reactions,
    };

    if (replies.length > 0) {
      const repliesWithReactions = await Promise.all(
        replies.map(async (reply) => {
          const reactions = await reactionAgent.get(
            reply.post.uri,
            reply.post.cid,
            50
          );

          return {
            ...reply,
            reactions: reactions.data,
          };
        })
      );

      return {
        post: postWithReactions,
        replies: repliesWithReactions,
      };
    }

    return { post: postWithReactions, replies: [] };
  } catch (e) {
    console.error(e);
    return {
      error: "投稿が見つかりませんでした。",
    };
  }
};
