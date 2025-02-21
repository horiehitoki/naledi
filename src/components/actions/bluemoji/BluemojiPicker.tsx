"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getEmojis } from "@/lib/api/stellar";
import { BlueMarilStellarGetEmojis } from "../../../../types/atmosphere";
import { useAgent } from "@/app/providers/agent";
import { useEmojiPicker } from "@/app/providers/BluemojiPickerProvider";
import useReaction from "@/lib/hooks/useReaction";
import Picker from "@/components/dataDisplay/bluemoji/BluemojiActions";

export default function BluemojiPicker() {
  const { isOpen, position, setIsOpen, target } = useEmojiPicker();
  const { handleReaction } = useReaction({
    uri: target.uri,
    cid: target.cid,
  });

  const pickerRef = useRef<HTMLDivElement>(null);
  const agent = useAgent();

  //絵文字の取得
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["emojis"],
      queryFn: async ({ pageParam }) => {
        return await getEmojis(20, pageParam);
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.data.cursor,
    });

  const emojis = data
    ? data.pages.flatMap((page) => page.data.items ?? [])
    : [];

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

  const handleEmojiSelect = (emoji: BlueMarilStellarGetEmojis.ItemView) => {
    handleReaction(emoji.ref.rkey, emoji.ref.repo, emoji.record);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={pickerRef}
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 50,
      }}
      className="w-[360px]"
    >
      <div className="w-full rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 bg-skin-base">
        <div className="p-3">
          <Picker
            localOnly={false}
            emojis={emojis}
            isLoading={isLoading}
            handleEmojiSelect={handleEmojiSelect}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            agentDid={agent.assertDid}
          />
        </div>
      </div>
    </div>
  );
}
