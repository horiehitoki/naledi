import { ProfileView } from "~/generated/api/types/app/bsky/actor/defs";
import { PostView } from "~/generated/api/types/app/bsky/feed/defs";
import { Reaction } from "~/generated/api/types/com/marukun-dev/pds/getReaction";

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
  uri: string,
  cid: string,
  element: HTMLDivElement
) => void;

export type ReactionData = {
  reaction: { cid: string; value: Reaction };
  post: PostView;
};

export type UserData = {
  profile: ProfileView;
  avatarUrl: string;
  feed: PostView[];
  cursor: string;
  follow: FollowRes;
  follower: FollowRes;
  reactions: ReactionData;
};
