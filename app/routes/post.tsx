import {
  PostView,
  ThreadViewPost,
  ReasonRepost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Main from "~/components/layout/main";
import Post from "~/components/timeline/post";
import Alert from "~/components/ui/alert";
import { Reaction } from "~/generated/api/types/app/netlify/stellarbsky/getReaction";
import { getSessionAgent } from "~/lib/auth/session";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const agent = await getSessionAgent(request);
    if (!agent) return new Response(null, { status: 401 });

    const uri = getParams(request, "uri");
    if (!uri) return new Response(null, { status: 404 });

    const threads = await agent.getPostThread({ uri: uri });
    const post = threads.data.thread.post as PostView;
    const replies = threads.data.thread.replies as ThreadViewPost[];

    const res = await fetch(
      `${process.env.APPVIEW_URL}/xrpc/app.netlify.stellarbsky.getReaction?uri=${post.uri}&cid=${post.cid}&limit=50`
    );
    const json: { reactions: Reaction[] } = await res.json();
    const postWithReactions = {
      ...post,
      reactions: json.reactions,
    };

    const repliesWithReactions = await Promise.all(
      replies.map(async (reply) => {
        const res = await fetch(
          `${process.env.APPVIEW_URL}/xrpc/app.netlify.stellarbsky.getReaction?uri=${reply.post.uri}&cid=${reply.post.cid}&limit=50`
        );
        const json: { reactions: Reaction[] } = await res.json();
        return {
          ...reply,
          reactions: json.reactions,
        };
      })
    );

    return { post: postWithReactions, replies: repliesWithReactions };
  } catch (e) {
    console.error(e);
    return {
      error: "投稿が見つかりませんでした。",
    };
  }
};

export default function Threads() {
  const { post, replies, error } = useLoaderData<typeof loader>();

  if (!error)
    return (
      <Main>
        <Post
          post={post}
          reason={post.reason as ReasonRepost}
          reactions={post.reactions}
        />

        {replies.map((reply: any) => (
          <Post
            key={reply.post.uri}
            post={reply.post}
            reason={reply.reason as ReasonRepost}
            reactions={reply.reactions}
          />
        ))}
      </Main>
    );

  return <Alert message="投稿が見つかりませんでした。" />;
}
