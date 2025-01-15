import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const unreadState = atom<number>({
  key: "unread",
  default: 0,
});

export const useUnread = () => useRecoilValue(unreadState);
export const useSetUnread = () => useSetRecoilState(unreadState);
