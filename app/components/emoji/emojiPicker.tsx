import Picker from "@emoji-mart/react";
import {
  useEmojiPicker,
  usePickerState,
  useIsEmojiPickerOpen,
  useSetIsEmojiPickerOpen,
} from "~/state/emojiPicker";
import data from "@emoji-mart/data";
import { useEffect } from "react";
import { custom } from "~/constants/emoji";

export function EmojiPicker() {
  const { handleEmojiClick } = useEmojiPicker();

  const isOpen = useIsEmojiPickerOpen();
  const setIsOpen = useSetIsEmojiPickerOpen();
  const emojiPicker = usePickerState();

  //dynamic import
  useEffect(() => {
    import("emoji-mart").then((emojiMart) => {
      emojiMart.init({ data, custom });
    });
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: `${emojiPicker.position.top}px`,
        left: `${emojiPicker.position.left}px`,
        zIndex: 50,
      }}
    >
      {isOpen ? (
        <Picker
          onClickOutside={() => setIsOpen(false)}
          onEmojiSelect={handleEmojiClick}
          custom={custom}
        />
      ) : (
        ""
      )}
    </div>
  );
}
