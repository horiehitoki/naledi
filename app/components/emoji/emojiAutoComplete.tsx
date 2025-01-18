import { Emoji } from "@prisma/client";
import { useState, useRef, ChangeEvent } from "react";
import { useEmojis } from "~/state/emoji";
import EmojiRender from "../render/emojiRender";
import { BlueMojiCollectionItem } from "~/generated/api";
import { Textarea } from "../ui/textarea";

export default function EmojiAutocompleteInput() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Emoji[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const emojis: Emoji[] = useEmojis()!;

  const findEmojiMatches = (text: string) => {
    const colonIndex = text.lastIndexOf(":");
    if (colonIndex === -1) return [];

    const searchTerm = text.slice(colonIndex + 1).toLowerCase();
    if (!searchTerm) return [];

    return emojis
      .filter((emoji) => emoji.rkey.toLowerCase().includes(searchTerm))
      .slice(0, 10);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const position = e.target.selectionStart;
    setInputValue(value);
    setCursorPosition(position!);

    const matches = findEmojiMatches(value.slice(0, position!));
    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const insertEmoji = (emoji: Emoji) => {
    const textBeforeCursor = inputValue.slice(0, cursorPosition);
    const colonIndex = textBeforeCursor.lastIndexOf(":");
    const textAfterCursor = inputValue.slice(cursorPosition);

    const newValue =
      textBeforeCursor.slice(0, colonIndex) +
      `:${emoji.rkey}:` +
      textAfterCursor;

    setInputValue(newValue);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <Textarea
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        name="content"
        id="content"
        className="w-96 h-64"
      />

      {showSuggestions && (
        <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((emoji) => {
            const data: BlueMojiCollectionItem.ItemView = JSON.parse(
              emoji.record
            );

            if (emoji && data && data.formats.png_128)
              return (
                <button
                  key={emoji.rkey}
                  onClick={() => insertEmoji(emoji)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                >
                  <EmojiRender
                    repo={emoji.repo}
                    cid={data.formats.png_128.ref.$link}
                    name={data.name}
                  />

                  <span className="text-sm text-gray-600">:{emoji.rkey}:</span>
                </button>
              );
          })}
        </div>
      )}
    </div>
  );
}
