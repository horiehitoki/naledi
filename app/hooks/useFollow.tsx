import { useEffect, useState } from "react";
import { useCursor } from "./useCusor";
import { FollowRes } from "@types";
import { ProfileView } from "~/generated/api/types/app/bsky/actor/defs";

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

  useEffect(() => {
    createCursor("follow", initialFollow.cursor!);
    createCursor("follower", initialFollower.cursor!);
  }, []);

  const getEndpoint = (type: FollowType, cursor: string): string => {
    const endpoints = {
      follow: `/api/follows?cursor=${cursor}&did=${did}`,
      follower: `/api/followers?cursor=${cursor}&did=${did}`,
    };
    return endpoints[type];
  };

  // データのフェッチ
  const fetcher = async (type: FollowType) => {
    const currentCursor = readCursor(type)?.cursor;
    if (!currentCursor) return;
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
  };

  return {
    follow,
    follower,
    fetcher,
    hasMore,
  };
};
