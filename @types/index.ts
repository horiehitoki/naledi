import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { OutputSchema } from "@atproto/api/dist/client/types/app/bsky/feed/getAuthorFeed";

export type Session = { did: string };

export type ProfileData = {
  profile: ProfileViewDetailed;
  avatarUrl: string | null;
  posts: OutputSchema;
};
