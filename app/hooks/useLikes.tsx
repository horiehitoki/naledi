import { useEffect, useState } from "react";
import { useCursor } from "./useCusor";
import { DataWithCursor } from "@types";
import { Like } from "~/generated/api/types/app/bsky/feed/getLikes";

interface UseLikesProps {
  uri: string;
  initialLikes: { likes: Like[]; cursor: string };
}

export const useLikes = ({ uri, initialLikes }: UseLikesProps) => {
  const [likes, setLikes] = useState<Like[]>(initialLikes.likes);
  const { createCursor, readCursor, updateCursor } = useCursor();
  const [hasMore, setHasMore] = useState(!!initialLikes.cursor);

  useEffect(() => {
    createCursor("likes", initialLikes.cursor!);
  }, []);

  const fetcher = async () => {
    const currentCursor = readCursor("likes")?.cursor;
    if (!currentCursor) return;
    const endpoint = `/api/likes?uri=${uri}&cursor=${currentCursor}`;

    const res = await fetch(new URL(endpoint, window.origin));

    const json: DataWithCursor = await res.json();

    if (json.data) {
      setLikes((prev) => [...prev, ...json.data]);

      updateCursor("likes", json.cursor!);
      setHasMore(!!json.cursor);
    } else {
      setHasMore(false);
    }
  };

  return {
    likes,
    fetcher,
    hasMore,
  };
};
