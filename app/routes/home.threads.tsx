import { Reaction } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PostData } from "@types";
import { Heart, Repeat, MessageCircle } from "lucide-react";
import Post from "~/components/timeline/post";
import {
  FeedViewPost,
  PostView,
} from "~/generated/api/types/app/bsky/feed/defs";
import { getSessionAgent } from "~/utils/auth/session";
import { prisma } from "~/utils/db/prisma";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return null;

  const { searchParams } = new URL(request.url);
  const uri = searchParams.get("uri");
  if (!uri) return null;

  const threads = await agent.getPostThread({ uri: uri });

  const replies = threads.data.thread.replies as [];

  const post = threads.data.thread.post as PostView;

  const originalPostReaction: Reaction[] = await prisma.reaction.findMany({
    where: {
      uri: post.uri,
    },
  });

  //返信をリアクションデータ付きで返す
  const data: PostData[] = await Promise.all(
    replies.map(async (post: FeedViewPost) => {
      const reaction: Reaction[] = await prisma.reaction.findMany({
        where: {
          uri: post.post.uri,
        },
      });

      return { post, reaction };
    })
  );

  return { originalPostReaction, threads: threads.data.thread, data, uri };
};

export default function Threads() {
  const { originalPostReaction, threads, data, uri } =
    useLoaderData<typeof loader>();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Post
        data={{ post: { post: threads.post }, reaction: originalPostReaction }}
        key={threads.post.cid}
      />

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 my-6">
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
