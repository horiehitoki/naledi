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

export default function BluemojiPicker() {
  const { isOpen, position, setIsOpen, target } = useEmojiPicker();

  const { handleReaction } = useReaction({
    uri: target.uri,
    cid: target.cid,
  });

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

  if (isOpen)
    return (
      <div
        ref={pickerRef}
        style={{
          position: "absolute",
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 50,
        }}
      >
        <div className="w-[348px] border rounded-lg shadow-lg overflow-hidden bg-skin-base dark:text-white text-black">
          <div className="p-4 space-y-4">
            {isLoading ? (
              <p className="py-6 text-center">Loading...</p>
            ) : emojis.length > 0 ? (
              <div className="w-full">
                <Tabs.Root defaultValue="local" className="w-full">
                  <Tabs.TabsList className="w-full grid grid-cols-2">
                    <Tabs.TabsTrigger value="local" className="w-full">
                      My Bluemoji
                    </Tabs.TabsTrigger>
                    <Tabs.TabsTrigger value="global" className="w-full">
                      Global Bluemoji
                    </Tabs.TabsTrigger>
                  </Tabs.TabsList>
                  <Tabs.TabsContent value="local" className="mt-2">
                    <div className="grid grid-cols-8 gap-1 max-h-[320px] overflow-y-auto p-1">
                      {emojis
                        .filter((emoji) => emoji.repo === agent.did)
                        .map((emoji) => (
                          <button
                            key={emoji.ref.rkey}
                            className="flex flex-col items-center p-1 hover:bg-muted rounded-md transition-colors"
                            title={`:${emoji.rkey}:`}
                            onClick={() =>
                              handleReaction(
                                emoji.ref.rkey,
                                emoji.ref.repo,
                                emoji.record
                              )
                            }
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
                      {emojis.map((emoji) => (
                        <button
                          key={emoji.ref.rkey}
                          className="flex flex-col items-center p-1 hover:bg-muted rounded-md transition-colors"
                          title={`:${emoji.ref.rkey}:`}
                          onClick={() =>
                            handleReaction(
                              emoji.ref.rkey,
                              emoji.ref.repo,
                              emoji.record
                            )
                          }
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
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
}
