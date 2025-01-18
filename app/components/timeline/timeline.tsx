import {
  PostView,
  ReasonPin,
  ReasonRepost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import InfiniteScroll from "react-infinite-scroll-component";
import { options, useTimeline } from "~/hooks/useTimeline";
import Post from "./post";
import { Reaction } from "~/generated/api/types/blue/maril/stellar/getReactions";
import Alert from "../ui/alert";
import Loading from "../ui/loading";

type Post = {
  post: PostView;
  reason?:
    | ReasonRepost
    | ReasonPin
    | { [k: string]: unknown; $type: string }
    | undefined;
  reactions: Reaction[] | undefined;
};

export default function Timeline(options: options) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useTimeline(options);
  const posts = data?.pages.flatMap((page) => page.feed) ?? [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Alert message="タイムラインの取得に失敗しました。" />;
  }

  if (posts.length <= 0) {
    return (
      <h1 className="text-2xl font-bold text-center my-12">
        このフィードには投稿がありません。
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
          {posts.map((post: Post) => {
            return (
              <Post
                post={post.post}
                reason={post.reason}
                reactions={post.reactions}
                key={post.post.cid}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
