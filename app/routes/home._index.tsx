import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { Post } from "~/components/timeline/post";
import { getSessionAgent } from "~/utils/auth/session";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import InfiniteScroll from "react-infinite-scroll-component";
import Window from "~/components/window";
import { useState, useEffect } from "react";
import { TimelineState } from "@types";
import { v4 as uuidv4 } from "uuid";
import { useCursor } from "~/hooks/useCusor";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (!agent) return null;
  return null;
};

export default function Homepage() {
  const [timeline, setTimeline] = useState<TimelineState[]>([
    {
      id: uuidv4(),
      type: "home",
      did: null,
      posts: [],
    },
    {
      id: uuidv4(),
      type: "user",
      did: "did:plc:t3cnljy5vtnapjyhrnayypo3",
      posts: [],
    },
  ]);

  const { createCursor, readCursor, updateCursor } = useCursor();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        await Promise.all(
          timeline.map(async (timelineItem) => {
            let endpoint = "";

            switch (timelineItem.type) {
              case "home":
                endpoint = "/api/getTimeline/";
                break;
              case "user":
                endpoint = `/api/getUserPost/?did=${timelineItem.did}`;
                break;
            }

            const res = await fetch(new URL(endpoint, window.origin));
            const json = await res.json();

            if (json.feed?.length) {
              setTimeline((prev) =>
                prev.map((item) =>
                  item.id === timelineItem.id
                    ? { ...item, posts: json.feed }
                    : item
                )
              );
              createCursor(timelineItem.id, json.cursor);
              setHasMore(!!json.cursor);
            }
          })
        );
      } catch (error) {
        console.error("Failed to fetch initial posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  // 追加の投稿取得
  const fetchPost = async (timelineItem: TimelineState) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const currentCursor = readCursor(timelineItem.id)?.cursor;
      if (!currentCursor) return;

      let endpoint = "";

      switch (timelineItem.type) {
        case "home":
          endpoint = `/api/getTimeline?cursor=${currentCursor}`;
          break;
        case "user":
          endpoint = `/api/getUserPost?cursor=${currentCursor}&did=${timelineItem.did}`;
          break;
      }

      const res = await fetch(new URL(endpoint, window.origin));
      const json = await res.json();

      if (json.feed?.length) {
        setTimeline((prev) =>
          prev.map((item) =>
            item.id === timelineItem.id
              ? { ...item, posts: [...item.posts, ...json.feed] }
              : item
          )
        );
        updateCursor(timelineItem.id, json.cursor);
        setHasMore(!!json.cursor);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch more posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          next={() => fetchPost(timelineItem)}
          hasMore={hasMore}
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
