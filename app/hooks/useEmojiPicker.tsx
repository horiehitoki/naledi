import { useState, useEffect } from "react";

interface Position {
  top: number;
  left: number;
}

interface UseEmojiPickerReturn {
  isEmojiPickerOpen: boolean;
  position: Position;
  postId: string;
  handleEmojiClick: (event: any) => void;
  toggleEmojiPicker: (postId: string, element: HTMLDivElement) => void;
}

export const useEmojiPicker = (): UseEmojiPickerReturn => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [postId, setPostId] = useState("");
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

  const handleEmojiClick = (event: any) => {
    const emojiName = event.names[0];
    console.log(emojiName);
    setIsEmojiPickerOpen(false);
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

  const toggleEmojiPicker = (postId: string, element: HTMLDivElement) => {
    const newPosition = calculatePickerPosition(element);
    setPosition(newPosition);
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
    setPostId(postId);
  };

  return {
    isEmojiPickerOpen,
    position,
    postId,
    handleEmojiClick,
    toggleEmojiPicker,
  };
};
