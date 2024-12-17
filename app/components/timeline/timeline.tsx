import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import InfiniteScroll from "react-infinite-scroll-component";
import { options, useTimeline } from "~/hooks/useTimeline";
import Post from "./post";

export default function Timeline(options: options) {
  const { data, fetchNextPage, hasNextPage } = useTimeline(options);
  const posts = data?.pages.flatMap((page) => page.feed) ?? [];

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<div></div>}
    >
      <div className="space-y-8">
        {posts.map((post: FeedViewPost) => {
          return (
            <Post post={post.post} reason={post.reason} key={post.post.cid} />
          );
        })}
      </div>
    </InfiniteScroll>
  );
}
