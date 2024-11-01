import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Post } from "~/components/timeline/post";
import { getSessionAgent } from "~/utils/auth/session";
import { getTimelineFeed } from "~/utils/timeline/timeline";
import { useTimeline } from "~/hooks/useTimeline";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (!agent) return null;

  const { feed, cursor } = await getTimelineFeed(agent, { limit: 50 });

  return { feed, cursor };
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
    <>
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
    </>
  );
}
