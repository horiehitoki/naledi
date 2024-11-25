import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isEmojiPickerOpenState } from "~/state/emojiPicker";
import { EmojiClickData } from "emoji-picker-react";
import { useReactions } from "~/state/post";

export const useEmojiPicker = () => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useRecoilState(
    isEmojiPickerOpenState
  );
  const [emojiPicker, setEmojiPicker] = useState({
    position: {
      top: 0,
      left: 0,
    },
    target: {
      postId: "",
      uri: "",
      cid: "",
    },
  });

  const { createReaction } = useReactions(emojiPicker.target.cid);

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
    postId: string,
    uri: string,
    cid: string,
    element: HTMLDivElement
  ) => {
    const position = calculatePickerPosition(element);
    setEmojiPicker({ position, target: { postId, uri, cid } });
    setIsEmojiPickerOpen((prev) => !prev);
  };

  const handleEmojiClick = async (event: EmojiClickData) => {
    const emojiName = event.names[0].replace(/\s+/g, "_");

    // 絵文字リアクションを追加
    await createReaction(emojiName);

    // 絵文字ピッカーを閉じる
    setIsEmojiPickerOpen(false);
  };

  useEffect(() => {
    const handleResize = () => setIsEmojiPickerOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isEmojiPickerOpen,
    emojiPicker,
    toggleEmojiPicker,
    handleEmojiClick,
  };
};
