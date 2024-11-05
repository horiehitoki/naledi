import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { Post } from "~/components/timeline/post";
import { getSessionAgent } from "~/utils/auth/session";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import InfiniteScroll from "react-infinite-scroll-component";
import Window from "~/components/window";
import { v4 as uuidv4 } from "uuid";
import { useTimeline } from "~/hooks/useTimeline";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (!agent) return null;
  return null;
};

export default function Homepage() {
  const { timeline, isLoading, fetcher } = useTimeline([
    {
      id: uuidv4(),
      type: "home",
      did: null,
      posts: [],
      hasMore: true,
    },
    {
      id: uuidv4(),
      type: "user",
      did: "did:plc:hbpzfim6uqz522avxupaud5y",
      posts: [],
      hasMore: true,
    },
  ]);

  if (isLoading && timeline[0].posts.length === 0) {
    return (
      <div className="m-auto animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    );
  }

  return timeline.map((timelineItem) => (
    <Window title="ホームタイムライン" key={timelineItem.id}>
      <div
        id={`scrollable-timeline-${timelineItem.id}`}
        className="h-full overflow-auto"
      >
        <InfiniteScroll
          dataLength={timelineItem.posts.length}
          next={() => fetcher(timelineItem)}
          hasMore={timelineItem.hasMore}
          scrollableTarget={`scrollable-timeline-${timelineItem.id}`}
          loader={
            <div className="m-auto my-16 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          }
        >
          <div className="space-y-8">
            {timelineItem.posts.map((postItem) => {
              const postData = postItem.post as PostView;
              return <Post key={postData.cid} post={postData} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </Window>
  ));
}
