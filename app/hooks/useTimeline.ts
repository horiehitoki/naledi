import { useState, useEffect, useCallback, useRef } from "react";
import type { PostType } from "@types";

interface TimelineParams {
  initialFeed: PostType[];
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
  const [posts, setPosts] = useState<PostType[]>(initialFeed);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(
    initialCursor
  );

  const loadMorePosts = useCallback(async () => {
    if (!currentCursor || isLoading) return;

    try {
      setIsLoading(true);
      let res;

      if (did) {
        res = await fetch(
          `${fetchEndpoint}?cursor=${currentCursor}&did=${did}`
        );
      } else {
        res = await fetch(`${fetchEndpoint}?cursor=${currentCursor}`);
      }

      const json = await res.json();

      if (json.feed?.length) {
        setPosts((prevPosts) => [...prevPosts, ...json.feed]);
        setCurrentCursor(json.cursor);
      } else {
        setCurrentCursor(undefined);
      }
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentCursor, isLoading, fetchEndpoint, did]);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentCursor || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loadMorePosts, currentCursor, isLoading]);

  return {
    posts,
    isLoading,
    currentCursor,
    loadMoreRef,
  };
};
