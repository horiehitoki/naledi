"use client";

import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getEmojis } from "@/lib/api/stellar";
import { BlueMarilStellarGetEmojis } from "../../../../types/atmosphere";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import { useAgent } from "@/app/providers/agent";

export default function EmojiPicker() {
  const [isOpen, setIsOpen] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmojis, setFilteredEmojis] = useState<
    BlueMarilStellarGetEmojis.ItemView[]
  >([]);
  const pickerRef = useRef<HTMLDivElement>(null);
  const agent = useAgent();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["emojis"],
      queryFn: async ({ pageParam }) => {
        return await getEmojis(20, pageParam);
      },
      initialPageParam: null,
      getNextPageParam: (lastPage: {
        data: BlueMarilStellarGetEmojis.OutputSchema;
      }) => lastPage.data.cursor,
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

  useEffect(() => {
    const newFilteredEmojis = searchTerm
      ? emojis.filter((emoji) =>
          emoji.rkey.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : emojis;

    setFilteredEmojis(newFilteredEmojis);
  }, [searchTerm, emojis]);

  if (!isOpen) return null;

  return (
    <div
      ref={pickerRef}
      style={{
        position: "absolute",
        top: `1px`,
        left: `1px`,
        zIndex: 50,
      }}
    >
      <div className="w-[348px] bg-background border rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="絵文字を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />

          {isLoading ? (
            <p className="py-6 text-center">読み込み中...</p>
          ) : filteredEmojis.length > 0 ? (
            <div className="w-full">
              <Tabs.Root defaultValue="local" className="w-full">
                <Tabs.TabsList className="w-full grid grid-cols-2">
                  <Tabs.TabsTrigger value="local" className="w-full">
                    ローカルの絵文字
                  </Tabs.TabsTrigger>
                  <Tabs.TabsTrigger value="global" className="w-full">
                    グローバルの絵文字
                  </Tabs.TabsTrigger>
                </Tabs.TabsList>
                <Tabs.TabsContent value="local" className="mt-2">
                  <div className="grid grid-cols-8 gap-1 max-h-[320px] overflow-y-auto p-1">
                    {filteredEmojis
                      .filter((emoji) => emoji.repo === agent.did)
                      .map((emoji) => (
                        <button
                          key={emoji.ref.rkey}
                          className="flex flex-col items-center p-1 hover:bg-muted rounded-md transition-colors"
                          title={`:${emoji.rkey}:`}
                        >
                          <div className="w-8 h-8 flex items-center justify-center">
                            <Image
                              src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${emoji.record.did}/${emoji.record.formats.png_128!.ref.$link}@png`}
                              alt={emoji.ref.rkey}
                              width={32}
                              height={32}
                            />
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate w-full text-center">
                            {emoji.ref.rkey}
                          </div>
                        </button>
                      ))}
                  </div>
                </Tabs.TabsContent>
                <Tabs.TabsContent value="global" className="mt-2">
                  <div className="grid grid-cols-8 gap-1 max-h-[320px] overflow-y-auto p-1">
                    {filteredEmojis.map((emoji) => (
                      <button
                        key={emoji.ref.rkey}
                        className="flex flex-col items-center p-1 hover:bg-muted rounded-md transition-colors"
                        title={`:${emoji.ref.rkey}:`}
                      >
                        <div className="w-8 h-8 flex items-center justify-center">
                          <Image
                            src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${emoji.ref.repo}/${emoji.record.formats.png_128!.ref.$link}@png`}
                            alt={emoji.ref.rkey}
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate w-full text-center">
                          {emoji.ref.rkey}
                        </div>
                      </button>
                    ))}
                  </div>
                </Tabs.TabsContent>
              </Tabs.Root>
            </div>
          ) : (
            <p className="py-6 text-center">Bluemojiが見つかりません。</p>
          )}

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="w-full py-2 text-center text-sm text-blue-500 hover:text-blue-700 disabled:text-gray-400"
            >
              {isFetchingNextPage ? "読み込み中..." : "もっと見る"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
