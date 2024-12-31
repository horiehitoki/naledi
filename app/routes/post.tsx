import {
  PostView,
  ThreadViewPost,
  ReasonRepost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Main from "~/components/layout/main";
import Post from "~/components/timeline/post";
import { Reaction } from "~/generated/api/types/app/netlify/stellarbsky/getReaction";
import { getSessionAgent } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return new Response(null, { status: 401 });

  const { searchParams } = new URL(request.url);
  const uri = searchParams.get("uri");
  if (!uri) return new Response(null, { status: 404 });

  const threads = await agent.getPostThread({ uri: uri });
  const post = threads.data.thread.post as PostView;
  const replies = threads.data.thread.replies as ThreadViewPost[];

  const res = await fetch(
    `http://localhost:5173/xrpc/app.netlify.stellarbsky.getReaction?uri=${post.uri}&cid=${post.cid}&limit=50`
  );
  const json: { reactions: Reaction[] } = await res.json();
  const postWithReactions = {
    ...post,
    reactions: json.reactions,
  };

  const repliesWithReactions = await Promise.all(
    replies.map(async (reply) => {
      const res = await fetch(
        `http://localhost:5173/xrpc/app.netlify.stellarbsky.getReaction?uri=${reply.post.uri}&cid=${reply.post.cid}&limit=50`
      );
      const json: { reactions: Reaction[] } = await res.json();
      return {
        ...reply,
        reactions: json.reactions,
      };
    })
  );

  return { post: postWithReactions, replies: repliesWithReactions };
};

export default function Threads() {
  const { post, replies } = useLoaderData<typeof loader>();

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
}
