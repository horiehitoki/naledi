import InfiniteScroll from "react-infinite-scroll-component";
import { options, useSearch } from "~/hooks/useSearch";
import Post from "./post";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Reaction } from "~/generated/api/types/com/marukun-dev/stellar/getReaction";
import Alert from "../ui/alert";

export default function Search(options: options) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useSearch(options);
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (isLoading) {
    <h1>loading...</h1>;
  }

  if (isError) {
    <Alert message="タイムラインの取得に失敗しました。" />;
  }

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
