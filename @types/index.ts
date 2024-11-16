import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export type Session = { did: string };

export type TimelineStorage = {
  id: string;
  type: "home" | "user";
  did: string | null;
};

export type TimelineState = {
  id: string;
  type: "home" | "user";
  did: string | null;
  posts: PostView[];
  hasMore: boolean;
};

export type FollowRes = {
  list: ProfileView[];
  cursor: string | undefined;
};

export type Cursor = {
  id: string;
  cursor: string;
};

export type toggleEmojiPicker = (
  postId: string,
  element: HTMLDivElement
) => void;
