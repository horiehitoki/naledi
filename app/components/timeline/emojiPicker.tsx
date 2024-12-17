import Picker from "@emoji-mart/react";
import {
  useEmojiPicker,
  usePickerState,
  useIsEmojiPickerOpen,
  useSetIsEmojiPickerOpen,
} from "~/state/emojiPicker";

export function EmojiPicker() {
  const { handleEmojiClick } = useEmojiPicker();

  const isOpen = useIsEmojiPickerOpen();
  const setIsOpen = useSetIsEmojiPickerOpen();

  const emojiPicker = usePickerState();

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
        />
      ) : (
        ""
      )}
    </div>
  );
}
