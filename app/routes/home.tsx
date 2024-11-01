import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, redirect, useLoaderData } from "@remix-run/react";
import { Post } from "~/components/timeline/post";
import { getSessionAgent } from "~/utils/auth/session";
import { getTimelineFeed } from "~/utils/timeline/timeline";
import { useTimeline } from "~/hooks/useTimeline";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return redirect("/login");

  return getTimelineFeed(agent, { limit: 50 });
};

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  const { posts, isLoading, currentCursor, loadMoreRef } = useTimeline({
    initialFeed: data?.feed || [],
    initialCursor: data?.cursor,
    fetchEndpoint: "/api/getTimeline",
    did: null,
  });

  if (!data) return null;

  return (
    <div className="m-auto md:w-1/2 w-3/4 py-14">
      <h1 className="text-4xl font-bold text-center py-10">
        ホームタイムライン
      </h1>

      {posts.map((postItem) => {
        const postData = postItem.post as PostView;

        return <Post key={postData.cid} post={postData} />;
      })}

      {currentCursor && (
        <div
          ref={loadMoreRef}
          className="w-full h-20 flex items-center justify-center"
        >
          {isLoading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          )}
        </div>
      )}

      <Outlet />
    </div>
  );
}
