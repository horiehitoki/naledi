import { atom } from "recoil";
import { ProfileView } from "~/generated/api/types/app/bsky/actor/defs";

export const sessionState = atom<ProfileView | null>({
  key: "session",
  default: null,
});
