import {
  PostView,
  ReasonPin,
  ReasonRepost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import InfiniteScroll from "react-infinite-scroll-component";
import { options, useTimeline } from "~/hooks/useTimeline";
import Post from "./post";
import { Reaction } from "~/generated/api/types/app/netlify/stellarbsky/getReaction";

type Post = {
  post: PostView;
  reason:
    | ReasonRepost
    | ReasonPin
    | { [k: string]: unknown; $type: string }
    | undefined;
  reactions: Reaction[];
};

export default function Timeline(options: options) {
  const { data, fetchNextPage, hasNextPage } = useTimeline(options);
  const posts = data?.pages.flatMap((page) => page.feed) ?? [];

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
