import InfiniteScroll from "react-infinite-scroll-component";
import { options, useSearch } from "~/hooks/useSearch";
import Post from "./post";
import Loading from "../ui/loading";
import { FeedViewPostWithReaction } from "./timeline";

export default function Search(options: options) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useSearch(options);
  const posts = data ? data.pages.flatMap((page) => page.feed ?? []) : [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1 className="text-center">検索に失敗しました。</h1>;
  }

  if (posts.length <= 0) {
    return (
      <h1 className="text-2xl font-bold text-center my-12">
        検索結果が見つかりませんでした。
      </h1>
    );
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Loading />}
      >
        <div>
          {posts.map((feed: FeedViewPostWithReaction) => {
            return (
              <Post
                post={feed.post}
                reactions={feed.reactions}
                reply={feed.reply}
                key={feed.post.cid}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
