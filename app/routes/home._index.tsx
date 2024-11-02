import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Post } from "~/components/timeline/post";
import { getSessionAgent } from "~/utils/auth/session";
import { getTimelineFeed } from "~/utils/timeline/timeline";
import { useTimeline } from "~/hooks/useTimeline";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import InfiniteScroll from "react-infinite-scroll-component";
import Window from "~/components/window";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (!agent) return null;

  const { feed, cursor } = await getTimelineFeed(agent, { limit: 50 });

  return { feed, cursor };
};

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  const { posts, hasMore, loadMorePosts } = useTimeline({
    initialFeed: data?.feed || [],
    initialCursor: data?.cursor,
    fetchEndpoint: "/api/getTimeline",
    did: null,
  });

  if (!data) return null;

  return (
    <Window title="ホームタイムライン">
      <div id="scrollable-timeline" className="h-full overflow-auto">
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          scrollableTarget="scrollable-timeline"
          loader={
            <div className="m-auto my-16 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          }
        >
          <div className="space-y-8">
            {posts.map((postItem) => {
              const postData = postItem.post as PostView;

              return <Post key={postData.cid} post={postData} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </Window>
  );
}
