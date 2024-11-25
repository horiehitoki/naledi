import { useState } from "react";
import { DataWithCursor, PostData, TimelineOptions } from "@types";

export const useTimeline = (
  options: TimelineOptions,
  initialData: DataWithCursor
) => {
  const [posts, setPosts] = useState<PostData[]>(initialData.data);
  const [cursor, setCursor] = useState<string>(initialData.cursor!);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetcher = async () => {
    if (!cursor) return;
    let endpoint = "";

    switch (options.type) {
      case "home":
        endpoint = `/api/timeline?cursor=${cursor}`;
        break;
      case "user":
        endpoint = `/api/timeline?cursor=${cursor}&did=${options.did}`;
        break;
    }

    const res = await fetch(new URL(endpoint, window.origin));
    const json = await res.json();
    const data: PostData[] = json.data;

    if (data.length) {
      setPosts((prev) => [...prev, ...data]);
      setCursor(json.cursor);
      setHasMore(!!json.cursor);
    } else {
      setHasMore(false);
    }
  };

  return {
    posts,
    fetcher,
    hasMore,
  };
};
