import {
  PostView,
  ReasonPin,
  ReasonRepost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import InfiniteScroll from "react-infinite-scroll-component";
import { options, useTimeline } from "~/hooks/useTimeline";
import Post from "./post";
import { Reaction } from "~/generated/api/types/com/marukun-dev/stellar/getReaction";
import Alert from "../ui/alert";

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
