import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { usePost, useReaction } from "./post";
import { useProfile } from "./profile";

export const isEmojiPickerOpenState = atom<boolean>({
  key: "isEmojiPickerOpen",
  default: false,
});

export const PickerState = atom({
  key: "PickerState",
  default: { uri: "", cid: "", position: { top: 0, left: 0 } },
});

export const usePickerState = () => useRecoilValue(PickerState);
export const useSetPickerState = () => useSetRecoilState(PickerState);

export const useIsEmojiPickerOpen = () =>
  useRecoilValue(isEmojiPickerOpenState);
export const useSetIsEmojiPickerOpen = () =>
  useSetRecoilState(isEmojiPickerOpenState);

export const useEmojiPicker = () => {
  const picker = usePickerState();
  const post = usePost(picker.cid);

  const { reaction } = useReaction(picker.cid);

  const profile = useProfile();

  const setPicker = useSetPickerState();
  const setIsOpen = useSetIsEmojiPickerOpen();

  const calculatePickerPosition = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    return {
      top: rect.bottom + scrollY,
      left: rect.left + scrollX,
    };
  };

  const toggleEmojiPicker = (
    uri: string,
    cid: string,
    element: HTMLDivElement
  ) => {
    const position = calculatePickerPosition(element);

    setIsOpen(true);

    setPicker({ uri, cid, position });
  };

  const handleEmojiClick = async (emoji: { shortcodes: string }) => {
    // 絵文字ピッカーを閉じる
    setIsOpen(false);

    const myReactions = post.reactions.filter(
      (reaction) =>
        reaction.authorDid === profile?.did &&
        reaction.emoji === emoji.shortcodes
    );

    if (myReactions.length <= 0) {
      reaction(emoji.shortcodes);
    }
  };

  return {
    toggleEmojiPicker,
    handleEmojiClick,
  };
};
