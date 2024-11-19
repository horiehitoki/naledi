import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Trash } from "lucide-react";
import { TimelineState, TimelineStorage } from "@types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Post } from "./post";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useTimeline } from "~/hooks/useTimeline";
import { v4 as uuidv4 } from "uuid";
import { ClientOnly } from "remix-utils/client-only";
import { LoadingSpinner } from "../ui/loading";

function SNSTimelineComponent({ type }: { type: "default" | "deck" }) {
  const [savedTimeline, setSavedTimeline] =
    useLocalStorage<TimelineStorage[]>("timeline");

  //初回ロード時にhomeタイムラインを追加
  if (savedTimeline) {
    null;
  } else {
    setSavedTimeline([{ id: uuidv4(), type: "home", did: "null" }]);
  }

  //timelineのStateを生成
  const { timeline, fetcher } = useTimeline(
    savedTimeline.map((prev: TimelineStorage) => {
      return { ...prev, posts: [], hasMore: true };
    })
  );

  const deleteTimeline = (id: string) => {
    setSavedTimeline((prev) => prev.filter((data) => data.id !== id));
  };

  if (type == "deck")
    return (
      <div className="flex space-x-8 min-w-screen max-h-screen">
        {timeline.map((timelineItem: TimelineState) => (
          <Card
            className="overflow-y-scroll w-96 max-h-screen"
            key={timelineItem.id}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>
                {timelineItem.type == "home"
                  ? "ホームタイムライン"
                  : "ユーザータイムライン"}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteTimeline(timelineItem.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <InfiniteScroll
                dataLength={timelineItem.posts.length}
                next={() => fetcher(timelineItem)}
                hasMore={timelineItem.hasMore}
                loader={<div></div>}
                height="90vh"
                className="pr-4"
              >
                <div className="space-y-8">
                  {timelineItem.posts.map((data: any) => {
                    return <Post key={data.post.cid} data={data} />;
                  })}
                </div>
              </InfiniteScroll>
            </CardContent>
          </Card>
        ))}
      </div>
    );

  if (type == "default")
    return (
      <div className="m-auto">
        <InfiniteScroll
          dataLength={timeline[0].posts.length}
          next={() => fetcher(timeline[0])}
          hasMore={timeline[0].hasMore}
          loader={<div></div>}
          height="100vh"
        >
          <div className="space-y-8">
            {timeline[0].posts.map((data: any) => {
              return <Post key={data.post.cid} data={data} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
}

//client only
export default function SNSTimeline({ type }: { type: "default" | "deck" }) {
  return (
    <ClientOnly
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      {() => <SNSTimelineComponent type={type} />}
    </ClientOnly>
  );
}
