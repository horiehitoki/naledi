import { useEffect, useRef } from "react";
import {
  useEmojiPicker,
  usePickerState,
  useIsEmojiPickerOpen,
  useSetIsEmojiPickerOpen,
} from "~/state/emojiPicker";
import EmojiRender from "../render/emojiRender";
import { Emoji } from "@prisma/client";
import { useProfile } from "~/state/profile";
import { BlueMojiCollectionItem } from "~/generated/api";

export function EmojiPicker({ emojis }: { emojis: Emoji[] }) {
  const { handleEmojiClick } = useEmojiPicker();
  const isOpen = useIsEmojiPickerOpen();
  const setIsOpen = useSetIsEmojiPickerOpen();
  const emojiPicker = usePickerState();

  const profile = useProfile();

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const element = event.target as Element;

      if (
        pickerRef.current &&
        !pickerRef.current.contains(target) &&
        element.id !== "pickerOpen"
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={pickerRef}
      style={{
        position: "absolute",
        top: `${emojiPicker.position.top}px`,
        left: `${emojiPicker.position.left}px`,
        zIndex: 50,
      }}
    >
      <div className="w-[348px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="h-[270px] overflow-y-auto p-4">
          <div className="grid grid-cols-8 gap-1">
            {emojis.map((emoji) => {
              const data = JSON.parse(
                emoji.record
              ) as BlueMojiCollectionItem.ItemView;

              return (
                <button
                  className="text-2xl p-1 hover:bg-gray-100 rounded"
                  key={data.name}
                  onClick={() =>
                    handleEmojiClick(
                      emoji.rkey,
                      emoji.repo,
                      JSON.parse(emoji.record),
                      profile!
                    )
                  }
                >
                  <EmojiRender
                    cid={data.formats.png_128!.ref.$link}
                    repo={emoji.repo}
                    alt={data.alt!}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
