import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PostData } from "@types";
import { Heart, Repeat, MessageCircle } from "lucide-react";
import Post from "~/components/timeline/post";
import { PostView } from "~/generated/api/types/app/bsky/feed/defs";
import { getSessionAgent } from "~/utils/auth/session";
import { ReactionAgent } from "~/utils/reactions/reactionAgent";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return null;

  const { searchParams } = new URL(request.url);
  const uri = searchParams.get("uri");
  if (!uri) return null;

  const threads = await agent.getPostThread({ uri: uri });
  const reactionAgent = new ReactionAgent(agent);

  const replies = threads.data.thread.replies as [];

  const post = threads.data.thread.post as PostView;

  //元のポストのリアクションデータを取得
  const [originalPost] = await reactionAgent.getReactions({
    posts: [{ post: post }],
  });

  //返信のリアクションデータを取得
  const data = await reactionAgent.getReactions({
    posts: replies,
  });

  return { originalPost, threads: threads.data.thread, data, uri };
};

export default function Threads() {
  const { originalPost, threads, data, uri } = useLoaderData<typeof loader>();

  return (
    <div className="m-auto px-4 py-6 h-[100vh]">
      <Post data={originalPost} key={threads.post.cid} />

      <div className="rounded-lg p-4 my-6">
        <div className="flex justify-center space-x-8">
          <a href={`/home/likes?uri=${uri}`}>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-medium">
                {threads.post.likeCount.toLocaleString()}
              </span>
            </div>
          </a>

          <div className="flex items-center space-x-2">
            <Repeat className="w-5 h-5 text-green-500" />
            <span className="font-medium">
              {threads.post.repostCount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            <span className="font-medium">
              {threads.post.replyCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {threads.replies && threads.replies.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-center mb-6">
            返信 ({threads.post.replyCount})
          </h2>
          <div className="space-y-8">
            {data.map((data: PostData) => (
              <Post data={data} key={data.post.post.cid} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
