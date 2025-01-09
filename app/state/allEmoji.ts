import { Emoji } from "@prisma/client";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const emojiState = atom<Emoji[] | null>({
  key: "emoji",
  default: [],
});

export const useEmojis = () => useRecoilValue(emojiState);
export const useSetEmojis = () => useSetRecoilState(emojiState);
