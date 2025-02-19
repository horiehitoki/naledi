"use client";

import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getEmojis } from "@/lib/api/stellar";
import { BlueMarilStellarGetEmojis } from "../../../../types/atmosphere";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import { useAgent } from "@/app/providers/agent";
import { useEmojiPicker } from "@/app/providers/BluemojiPickerProvider";
import useReaction from "@/lib/hooks/useReaction";
import { BiSearch } from "react-icons/bi";

type EmojiGridProps = {
  emojis: BlueMarilStellarGetEmojis.ItemView[];
  onEmojiSelect: (emoji: BlueMarilStellarGetEmojis.ItemView) => void;
};

const EmojiGrid = ({ emojis, onEmojiSelect }: EmojiGridProps) => (
  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-0.5 max-h-[280px] overflow-y-auto px-1">
    {emojis.map((emoji) => (
      <button
        key={emoji.ref.rkey}
        className="group flex flex-col items-center p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all"
        title={`:${emoji.ref.rkey}:`}
        onClick={() => onEmojiSelect(emoji)}
      >
        <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Image
            src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${emoji.ref.repo}/${emoji.record.formats.png_128!.ref.$link}@png`}
            alt={emoji.ref.rkey}
            width={32}
            height={32}
            className="rounded-sm"
          />
        </div>
        <div className="text-[10px] truncate w-full text-center mt-0.5">
          {emoji.ref.rkey}
        </div>
      </button>
    ))}
  </div>
);

const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="relative mb-2">
    <div className="absolute left-2 top-1/2 -translate-y-1/2">
      <BiSearch className="w-4 h-4" />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="絵文字を検索..."
      className="w-full pl-8 pr-4 py-1.5 text-sm rounded-md border border-transparent focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors text-skin-base bg-skin-base"
    />
  </div>
);

const LoadMoreButton = ({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
  >
    {isLoading ? "読み込み中..." : "もっと見る"}
  </button>
);

export default function BluemojiPicker() {
  const { isOpen, position, setIsOpen, target } = useEmojiPicker();
  const { handleReaction } = useReaction({
    uri: target.uri,
    cid: target.cid,
  });
  const pickerRef = useRef<HTMLDivElement>(null);
  const agent = useAgent();
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredEmojis = emojis.filter((emoji) =>
    emoji.ref.rkey.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
      );
    }

    if (emojis.length === 0) {
      return <div className="py-8 text-center">Bluemojiが見つかりません</div>;
    }

    const localEmojis = filteredEmojis.filter(
      (emoji) => emoji.ref.repo === agent.assertDid
    );

    return (
      <div className="w-full text-skin-base">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />

        <Tabs.Root defaultValue="local">
          <Tabs.TabsList className="w-full grid grid-cols-2 mb-2">
            <Tabs.TabsTrigger
              value="local"
              className="px-4 py-2 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 transition-colors"
            >
              マイ絵文字{localEmojis.length > 0 && ` (${localEmojis.length})`}
            </Tabs.TabsTrigger>
            <Tabs.TabsTrigger
              value="global"
              className="px-4 py-2 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 transition-colors"
            >
              すべての絵文字
              {filteredEmojis.length > 0 && ` (${filteredEmojis.length})`}
            </Tabs.TabsTrigger>
          </Tabs.TabsList>
          <Tabs.TabsContent value="local">
            {localEmojis.length > 0 ? (
              <EmojiGrid
                emojis={localEmojis}
                onEmojiSelect={handleEmojiSelect}
              />
            ) : (
              <div className="py-8 text-center">
                {searchQuery
                  ? "検索結果が見つかりません"
                  : "マイ絵文字がありません"}
              </div>
            )}
          </Tabs.TabsContent>
          <Tabs.TabsContent value="global">
            {filteredEmojis.length > 0 ? (
              <EmojiGrid
                emojis={filteredEmojis}
                onEmojiSelect={handleEmojiSelect}
              />
            ) : (
              <div className="py-8 text-center">検索結果が見つかりません</div>
            )}
          </Tabs.TabsContent>
        </Tabs.Root>

        {!searchQuery && hasNextPage && (
          <div className="mt-2 pt-2 border-t dark:border-gray-700">
            <LoadMoreButton
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
            />
          </div>
        )}
      </div>
    );
  };

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
        <div className="p-3">{renderContent()}</div>
      </div>
    </div>
  );
}
