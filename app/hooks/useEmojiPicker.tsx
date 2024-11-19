import { toggleEmojiPicker } from "@types";
import { EmojiClickData } from "emoji-picker-react";
import { useState, useEffect } from "react";
import { ProfileView } from "~/generated/api/types/app/bsky/actor/defs";

interface Position {
  top: number;
  left: number;
}

interface PostInfo {
  postId: string;
  uri: string;
  cid: string;
  profile: ProfileView;
}

interface UseEmojiPickerReturn {
  isEmojiPickerOpen: boolean;
  position: Position;
  postInfo: PostInfo | null;
  handleEmojiClick: (event: any) => void;
  toggleEmojiPicker: toggleEmojiPicker;
}

//絵文字ピッカー用のhooks
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

  //絵文字クリック時の処理
  const handleEmojiClick = async (event: EmojiClickData) => {
    const emojiName = event.names[0];

    if (postInfo) {
      setIsEmojiPickerOpen(false);

      await fetch("/api/create/reaction", {
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
          postedBy: postInfo.profile.did,
        }),
      });
    }
  };

  const calculatePickerPosition = (element: HTMLDivElement): Position => {
    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    const top = rect.bottom + scrollY;
    const left = rect.left + scrollX;

    return { top, left };
  };

  //絵文字ピッカーを開いたタイミングで、ターゲットの投稿を取得
  const toggleEmojiPicker = (
    postId: string,
    uri: string,
    cid: string,
    profile: ProfileView,
    element: HTMLDivElement
  ) => {
    const newPosition = calculatePickerPosition(element);

    setPosition(newPosition);
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
    setPostInfo({ postId, uri, cid, profile });
  };

  return {
    isEmojiPickerOpen,
    position,
    postInfo,
    handleEmojiClick,
    toggleEmojiPicker,
  };
};
