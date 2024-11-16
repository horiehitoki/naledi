import { toggleEmojiPicker } from "@types";
import { EmojiClickData } from "emoji-picker-react";
import { useState, useEffect } from "react";

interface Position {
  top: number;
  left: number;
}

interface PostInfo {
  postId: string;
  uri: string;
  cid: string;
}

interface UseEmojiPickerReturn {
  isEmojiPickerOpen: boolean;
  position: Position;
  postInfo: PostInfo | null;
  handleEmojiClick: (event: any) => void;
  toggleEmojiPicker: toggleEmojiPicker;
}

export const useEmojiPicker = (): UseEmojiPickerReturn => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsEmojiPickerOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEmojiClick = async (event: EmojiClickData) => {
    const emojiName = event.names[0];

    if (postInfo) {
      await fetch("/api/createEmojiRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: {
            uri: postInfo.uri,
            cid: postInfo.cid,
          },
          emoji: emojiName,
        }),
      });

      setIsEmojiPickerOpen(false);
    }
  };

  const calculatePickerPosition = (element: HTMLDivElement): Position => {
    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const pickerWidth = 350;
    const pickerHeight = 450;

    let top = rect.bottom + scrollY;
    let left = rect.left + scrollX;

    // 画面下部がはみ出す場合は上に表示
    if (top + pickerHeight > window.innerHeight + scrollY) {
      top = rect.top + scrollY - pickerHeight;
    }

    // 画面右側がはみ出す場合は左に表示
    if (left + pickerWidth > window.innerWidth + scrollX) {
      left = rect.right + scrollX - pickerWidth;
    }

    return { top, left };
  };

  const toggleEmojiPicker = (
    postId: string,
    uri: string,
    cid: string,
    element: HTMLDivElement
  ) => {
    const newPosition = calculatePickerPosition(element);

    setPosition(newPosition);
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
    setPostInfo({ postId, uri, cid });
  };

  return {
    isEmojiPickerOpen,
    position,
    postInfo,
    handleEmojiClick,
    toggleEmojiPicker,
  };
};
