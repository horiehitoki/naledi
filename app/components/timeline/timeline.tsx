import { DataWithCursor, PostData } from "@types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Post } from "./post";
import { useTimeline } from "~/hooks/useTimeline";
import { v4 } from "uuid";

export default function SNSTimeline({
  initialData,
}: {
  initialData: DataWithCursor;
}) {
  const { posts, fetcher, hasMore } = useTimeline(
    {
      id: v4(),
      type: "home",
      did: null,
    },
    initialData
  );

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={() => fetcher()}
      hasMore={hasMore}
      loader={<div></div>}
    >
      <div className="space-y-8">
        {posts.map((data: PostData) => {
          return <Post key={data.post.post.cid} data={data} />;
        })}
      </div>
    </InfiniteScroll>
  );
}
