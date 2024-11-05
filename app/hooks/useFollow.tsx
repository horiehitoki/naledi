import { useEffect, useState } from "react";
import { useCursor } from "./useCusor";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { FollowRes } from "@types";

type FollowType = "follow" | "follower";

interface UseFollowProps {
  did: string;
  initialFollow: FollowRes;
  initialFollower: FollowRes;
}

export const useFollow = ({
  did,
  initialFollow,
  initialFollower,
}: UseFollowProps) => {
  // フォローとフォロワーのState
  const [follow, setFollow] = useState<ProfileView[]>(initialFollow.list);
  const [follower, setFollower] = useState<ProfileView[]>(initialFollower.list);
  const { createCursor, readCursor, updateCursor } = useCursor();
  const [hasMore, setHasMore] = useState({
    follow: !!initialFollow.cursor,
    follower: !!initialFollower.cursor,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    createCursor("follow", initialFollow.cursor!);
    createCursor("follower", initialFollower.cursor!);
  }, []);

  const getEndpoint = (type: FollowType, cursor: string): string => {
    const endpoints = {
      follow: `/api/getFollows?cursor=${cursor}&did=${did}`,
      follower: `/api/getFollowers?cursor=${cursor}&did=${did}`,
    };
    return endpoints[type];
  };

  // データのフェッチ
  const fetcher = async (type: FollowType) => {
    if (isLoading) return;
    const currentCursor = readCursor(type)?.cursor;
    if (!currentCursor) return;
    setIsLoading(true);
    const endpoint = getEndpoint(type, currentCursor);
    const res = await fetch(new URL(endpoint, window.origin));
    const json: FollowRes = await res.json();
    if (json.list) {
      if (type === "follow") {
        setFollow((prev) => [...prev, ...json.list]);
      } else {
        setFollower((prev) => [...prev, ...json.list]);
      }
      updateCursor(type, json.cursor!);
      setHasMore((prev) => ({ ...prev, [type]: !!json.cursor }));
    } else {
      setHasMore((prev) => ({ ...prev, [type]: false }));
    }
    setIsLoading(false);
  };

  return {
    follow,
    follower,
    fetcher,
    hasMore,
    isLoading,
  };
};
