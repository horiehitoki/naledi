import { useState } from "react";
import { DataWithCursor } from "@types";
import { Like } from "~/generated/api/types/app/bsky/feed/getLikes";

interface UseLikesProps {
  uri: string;
  initialLikes: { likes: Like[]; cursor: string };
}

export const useLikes = ({ uri, initialLikes }: UseLikesProps) => {
  const [likes, setLikes] = useState<Like[]>(initialLikes.likes);
  const [cursor, setCursor] = useState<string>(initialLikes.cursor!);
  const [hasMore, setHasMore] = useState(!!initialLikes.cursor);

  const fetcher = async () => {
    if (!cursor) return;
    const endpoint = `/api/likes?uri=${uri}&cursor=${cursor}`;

    const res = await fetch(new URL(endpoint, window.origin));

    const json: DataWithCursor = await res.json();

    if (json.data) {
      setLikes((prev) => [...prev, ...json.data]);

      setCursor(json.cursor!);
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
