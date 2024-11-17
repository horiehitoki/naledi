import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Post from "~/components/timeline/post";
import { PostView } from "~/generated/api/types/app/bsky/feed/defs";
import { getSessionAgent } from "~/utils/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return null;

  const { searchParams } = new URL(request.url);
  const uri = searchParams.get("uri");
  if (!uri) return null;

  const threads = await agent.getPostThread({ uri: uri });

  return threads.data.thread;
};

export default function Threads() {
  const threads = useLoaderData<typeof loader>();

  return (
    <div className="w-3/4 m-auto">
      <Post post={threads.post}></Post>
      <hr className="h-px my-8 bg-black dark:bg-white border-0" />

      <h1 className="text-center text-2xl font-bold my-12">返信</h1>
      {threads.replies.map((thread: { post: PostView }) => {
        return <Post key={thread.post.cid} post={thread.post}></Post>;
      })}
    </div>
  );
}
