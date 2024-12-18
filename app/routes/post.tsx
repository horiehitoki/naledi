import { ThreadViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Main from "~/components/layout/main";
import Post from "~/components/timeline/post";
import { getSessionAgent } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return new Response(null, { status: 400 });

  const { searchParams } = new URL(request.url);
  const uri = searchParams.get("uri");
  if (!uri) return null;

  const threads = await agent.getPostThread({ uri: uri });

  const replies = threads.data.thread.replies;

  const post = threads.data.thread.post;

  return { post, replies };
};

//TODO リアクション対応
export default function Threads() {
  const { post, replies } = useLoaderData<typeof loader>();

  return (
    <Main>
      <Post post={post} reason={post.reason} reactions={[]} />

      {replies.map((post: ThreadViewPost) => {
        return (
          <Post
            post={post.post}
            reason={undefined}
            key={post.post.uri}
            reactions={[]}
          />
        );
      })}
    </Main>
  );
}
