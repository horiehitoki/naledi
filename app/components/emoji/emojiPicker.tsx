"use client";

import { useEffect, useRef, useState } from "react";
import {
  useEmojiPicker,
  usePickerState,
  useIsEmojiPickerOpen,
  useSetIsEmojiPickerOpen,
} from "~/state/emojiPicker";
import { Emoji } from "@prisma/client";
import { useProfile } from "~/state/profile";
import { BlueMojiCollectionItem } from "~/generated/api";
import { useEmojis } from "~/state/emoji";
import EmojiRender from "../render/emojiRender";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function EmojiPicker() {
  const { handleEmojiClick } = useEmojiPicker();
  const isOpen = useIsEmojiPickerOpen();
  const setIsOpen = useSetIsEmojiPickerOpen();
  const emojiPicker = usePickerState();
  const emojis = useEmojis()!;
  const profile = useProfile();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>(emojis);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        pickerRef.current &&
        !pickerRef.current.contains(target) &&
        !(target instanceof Element && target.closest(".pickerOpen"))
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    const newFilteredEmojis = searchTerm
      ? emojis.filter((emoji) =>
          emoji.rkey.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : emojis;

    setFilteredEmojis(newFilteredEmojis);
  }, [searchTerm, emojis]);

  if (!isOpen) return null;

  const renderEmojiButton = (emoji: Emoji) => {
    if (!emoji || !profile) return null;

    const data = JSON.parse(emoji.record) as BlueMojiCollectionItem.ItemView;
    if (!data) return null;

    return (
      <button
        key={emoji.rkey}
        onClick={() => handleEmojiClick(emoji.rkey, emoji.repo, data, profile)}
        className="flex flex-col items-center p-1 hover:bg-muted rounded-md transition-colors"
        title={`:${emoji.rkey}:`}
      >
        <div className="w-8 h-8 flex items-center justify-center">
          <EmojiRender
            repo={emoji.repo}
            cid={data.formats.png_128?.ref.$link}
            name={data.name}
          />
        </div>
        <div className="text-[10px] text-muted-foreground truncate w-full text-center">
          {emoji.rkey}
        </div>
      </button>
    );
  };

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
      <div className="w-[348px] bg-background border rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 space-y-4">
          <Input
            type="text"
            placeholder="絵文字を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />

          {filteredEmojis.length > 0 ? (
            <div className="w-full">
              <Tabs defaultValue="local" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="local" className="w-full">
                    ローカルの絵文字
                  </TabsTrigger>
                  <TabsTrigger value="global" className="w-full">
                    グローバルの絵文字
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="local" className="mt-2">
                  <div className="grid grid-cols-8 gap-1 max-h-[320px] overflow-y-auto p-1">
                    {filteredEmojis
                      .filter((emoji) => emoji.repo === profile?.did)
                      .map(renderEmojiButton)}
                  </div>
                </TabsContent>
                <TabsContent value="global" className="mt-2">
                  <div className="grid grid-cols-8 gap-1 max-h-[320px] overflow-y-auto p-1">
                    {filteredEmojis.map(renderEmojiButton)}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <p className="py-6 text-center">Bluemojiが見つかりません。</p>
          )}
        </div>
      </div>
    </div>
  );
}
