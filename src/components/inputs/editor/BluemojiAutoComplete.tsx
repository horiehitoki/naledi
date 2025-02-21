"use client";

import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getEmojis } from "@/lib/api/stellar";
import { BlueMarilStellarGetEmojis } from "../../../../types/atmosphere";
import Button from "@/components/actions/button/Button";
import { BiSmile } from "react-icons/bi";
import { useAgent } from "@/app/providers/agent";
import Picker from "@/components/dataDisplay/bluemoji/BluemojiActions";

export default function BluemojiAutoComplete({
  onEmojiSelect,
}: {
  onEmojiSelect: (emoji: string) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const agent = useAgent();

  //絵文字の取得
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["emojis", agent.assertDid],
      enabled: !!agent.assertDid,
      queryFn: async ({ pageParam }) => {
        return await getEmojis(20, pageParam, agent.assertDid);
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.data.cursor,
    });

  const emojis = data
    ? data.pages.flatMap((page) => page.data.items ?? [])
    : [];

  useEffect(() => {
    if (!showPicker) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  const handleEmojiSelect = (emoji: BlueMarilStellarGetEmojis.ItemView) => {
    onEmojiSelect(`:${emoji.ref.rkey}:`);
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setShowPicker(!showPicker);
        }}
        className="p-0"
      >
        <BiSmile className="text-primary hover:text-primary-dark text-2xl" />
      </Button>
      {showPicker && (
        <div
          ref={pickerRef}
          className="animate-fade animate-duration-200 absolute z-50 mt-2 shadow-md rounded-lg md:bottom-14 w-[360px] bg-skin-base"
        >
          <div className="p-3">
            <Picker
              localOnly={true}
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
      )}
    </div>
  );
}
