import InfiniteScroll from "react-infinite-scroll-component";
import { options, useSearch } from "~/hooks/useSearch";
import Post from "./post";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Reaction } from "~/generated/api/types/com/marukun-dev/stellar/getReaction";

export default function Search(options: options) {
  const { data, fetchNextPage, hasNextPage } = useSearch(options);
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div>loading...</div>}
      >
        <div>
          {posts.map((post: PostView) => {
            return (
              <Post
                post={post}
                reactions={post.reactions as Reaction[]}
                key={post.cid}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
