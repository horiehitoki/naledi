import { getSessionAgent } from "~/lib/auth/session";
import { getParams } from "~/utils/getParams";
import {
  PostView,
  ThreadViewPost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { LoaderFunction } from "@remix-run/node";
import { ReactionXrpc } from "~/lib/reaction/reactionXrpc";
import { FeedViewPostWithReaction } from "~/components/timeline/timeline";

//Claudeが書いた
export const loader: LoaderFunction = async ({ request }) => {
  try {
    const agent = await getSessionAgent(request);
    if (agent == null) return new Response(null, { status: 401 });

    const uri = getParams(request, "uri");
    if (!uri) return new Response(null, { status: 404 });

    const threads = await agent.getPostThread({ uri });
    const xrpc = new ReactionXrpc();

    // メイン投稿
    const post = threads.data.thread.post as PostView;
    const postReactions = await xrpc.getReactions(post.uri, post.cid, 20);

    const parents: FeedViewPostWithReaction[] = [];
    const MAX_PARENTS = 20;

    const getParents = async (thread: ThreadViewPost) => {
      if (!thread.parent) return;

      const parent = thread.parent as ThreadViewPost;

      const reactions = await xrpc.getReactions(
        parent.post.uri,
        parent.post.cid,
        20
      );

      parents.push({
        post: parent.post,
        reactions: reactions.data.reactions,
      });

      if (parents.length < MAX_PARENTS && parent.parent) {
        await getParents(parent);
      }
    };

    await getParents(threads.data.thread as ThreadViewPost);
    parents.reverse();

    const getReplies = async (
      thread: ThreadViewPost,
      depth: number
    ): Promise<FeedViewPostWithReaction[]> => {
      if (!thread.replies || depth >= 5) return [];

      const result: FeedViewPostWithReaction[] = await Promise.all(
        (thread.replies as ThreadViewPost[]).map(
          async (reply: ThreadViewPost) => {
            const replyReactions = await xrpc.getReactions(
              reply.post.uri,
              reply.post.cid,
              20
            );

            const replyWithReaction = {
              post: reply.post,
              reactions: replyReactions.data.reactions,
              replies: [] as FeedViewPostWithReaction[],
            };

            const childReplies = await getReplies(reply, depth + 1);

            if (childReplies.length > 0) {
              replyWithReaction.replies = childReplies;
            }

            return replyWithReaction;
          }
        )
      );

      return result;
    };

    const replies = await getReplies(threads.data.thread as ThreadViewPost, 0);

    return Response.json({
      parents,
      post: {
        post,
        reactions: postReactions.data.reactions,
      },
      replies,
    });
  } catch (e) {
    console.error(e);
    return Response.json({
      error: "スレッドの取得中にエラーが発生しました。",
    });
  }
};
