import {
  PostView,
  ReasonPin,
  ReasonRepost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import InfiniteScroll from "react-infinite-scroll-component";
import { options, useTimeline } from "~/hooks/useTimeline";
import Post from "./post";
import { Reaction } from "~/generated/api/types/blue/maril/stellar/getReactions";
import Loading from "../ui/loading";
import { ReplyRef } from "~/generated/api/types/app/bsky/feed/defs";

export type FeedViewPostWithReaction = {
  post: PostView;
  reply?: ReplyRef;
  reason?: ReasonRepost | ReasonPin | { $type: string; [k: string]: unknown };
  feedContext?: string;
  [k: string]: unknown;
  reactions: Reaction[] | undefined;
};

export default function Timeline(options: options) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useTimeline(options);
  const posts = data ? data.pages.flatMap((page) => page.feed ?? []) : [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1 className="text-center">タイムラインの取得に失敗しました。</h1>;
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
          {posts.map((feed: FeedViewPostWithReaction) => {
            return (
              <Post
                post={feed.post}
                reason={feed.reason}
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
