import { useState, useCallback } from "react";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

interface TimelineParams {
  initialFeed: PostView[];
  initialCursor?: string;
  fetchEndpoint: string;
  did: string | null;
}

export const useTimeline = ({
  initialFeed,
  initialCursor,
  fetchEndpoint,
  did,
}: TimelineParams) => {
  const [posts, setPosts] = useState<PostView[]>(initialFeed);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(
    initialCursor
  );
  const [hasMore, setHasMore] = useState<boolean>(!!initialCursor);

  const loadMorePosts = useCallback(async () => {
    if (!currentCursor || isLoading) return;

    setIsLoading(true);
    let res;

    if (did) {
      res = await fetch(`${fetchEndpoint}?cursor=${currentCursor}&did=${did}`);
    } else {
      res = await fetch(`${fetchEndpoint}?cursor=${currentCursor}`);
    }

    const json = await res.json();

    if (json.feed?.length) {
      setPosts((prevPosts) => [...prevPosts, ...json.feed]);
      setCurrentCursor(json.cursor);
      setHasMore(!!json.cursor);
    } else {
      setHasMore(false);
    }

    setIsLoading(false);
  }, [currentCursor, isLoading, fetchEndpoint, did]);

  return {
    posts,
    hasMore,
    loadMorePosts,
  };
};
