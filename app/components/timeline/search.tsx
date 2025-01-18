import InfiniteScroll from "react-infinite-scroll-component";
import { options, useSearch } from "~/hooks/useSearch";
import Post from "./post";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Reaction } from "~/generated/api/types/blue/maril/stellar/getReactions";
import Alert from "../ui/alert";
import Loading from "../ui/loading";

export default function Search(options: options) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useSearch(options);
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Alert message="タイムラインの取得に失敗しました。" />;
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
