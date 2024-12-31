import Picker from "@emoji-mart/react";
import {
  useEmojiPicker,
  usePickerState,
  useIsEmojiPickerOpen,
  useSetIsEmojiPickerOpen,
} from "~/state/emojiPicker";
import data from "@emoji-mart/data";

export function EmojiPicker() {
  const { handleEmojiClick } = useEmojiPicker();

  const isOpen = useIsEmojiPickerOpen();
  const setIsOpen = useSetIsEmojiPickerOpen();

  const emojiPicker = usePickerState();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: `${emojiPicker.position.top}px`,
        left: `${emojiPicker.position.left}px`,
        zIndex: 50,
      }}
    >
      <Picker
        data={data}
        onClickOutside={() => setIsOpen(false)}
        onEmojiSelect={handleEmojiClick}
      />
    </div>
  );
}
