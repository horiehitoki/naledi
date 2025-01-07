import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useReaction } from "./post";
import { BlueMojiCollectionItem } from "~/generated/api";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

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

//絵文字ピッカー操作用
export const useEmojiPicker = () => {
  const picker = usePickerState();

  const { reaction } = useReaction(picker.cid);

  const setPicker = useSetPickerState();
  const isOpen = useIsEmojiPickerOpen();
  const setIsOpen = useSetIsEmojiPickerOpen();

  //リアクションボタンの下にpickerを出すための位置取得
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

    setIsOpen(!isOpen);

    //リアクションをつける投稿とポジションをSet
    setPicker({ uri, cid, position });
  };

  const handleEmojiClick = async (
    rkey: string,
    repo: string,
    emoji: BlueMojiCollectionItem.ItemView,
    actor: ProfileView
  ) => {
    // 絵文字ピッカーを閉じる
    setIsOpen(false);

    reaction(rkey, repo, emoji, actor);
  };

  return {
    toggleEmojiPicker,
    handleEmojiClick,
  };
};
