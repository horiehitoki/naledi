import {
  FeedViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useInfiniteQuery } from "@tanstack/react-query";

export type options = { type: string; did: string | null };

export const useTimeline = (options: options) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["timeline"],
    queryFn: async ({ pageParam }) => {
      let endpoint;

      if (pageParam) {
        endpoint =
          options.type === "home"
            ? `/api/timeline?cursor=${pageParam}`
            : `/api/timeline?cursor=${pageParam}&did=${options.did}`;
      } else {
        endpoint =
          options.type === "home"
            ? `/api/timeline`
            : `/api/timeline?did=${options.did}`;
      }

      const res = await fetch(endpoint);

      const feedView = await res.json();

      feedView.feed.map(async (post: FeedViewPost) => {
        const reactionRes = await fetch(
          `/xrpc/app.netlify.stellarbsky.getReaction?uri=${post.post.uri}&cid=${post.post.cid}`
        );
        const reactions = await reactionRes.json();

        console.log(reactions);
      });

      return feedView;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  return { data, fetchNextPage, hasNextPage };
};
