"use client";
import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getEmojis } from "@/lib/api/stellar";
import { BlueMarilStellarGetEmojis } from "../../../../types/atmosphere";
import { useAgent } from "@/app/providers/agent";
import { useEmojiPicker } from "@/app/providers/BluemojiPickerProvider";
import useReaction from "@/lib/hooks/useReaction";
import Picker from "@/components/dataDisplay/bluemoji/Picker";

export default function BluemojiPicker() {
  const { isOpen, setIsOpen, target } = useEmojiPicker();
  const { handleReaction } = useReaction({
    uri: target.uri,
    cid: target.cid,
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const agent = useAgent();

  // グローバル絵文字の取得
  const {
    data: globalData,
    isLoading: globalIsLoading,
    fetchNextPage: globalFetchNextPage,
    hasNextPage: globalHasNextPage,
    isFetchingNextPage: globalIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["emojis", "global"],
    queryFn: async ({ pageParam }) => {
      return await getEmojis(50, pageParam);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.data.cursor,
  });

  // ローカル絵文字の取得
  const {
    data: localData,
    isLoading: localIsLoading,
    fetchNextPage: localFetchNextPage,
    hasNextPage: localHasNextPage,
    isFetchingNextPage: localIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["emojis", "local", agent.did],
    queryFn: async ({ pageParam }) => {
      return await getEmojis(50, pageParam, agent.did);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.data.cursor,
    enabled: !!agent.did,
  });

  const globalEmojis = globalData
    ? globalData.pages.flatMap((page) => page.data.items ?? [])
    : [];
  const localEmojis = localData
    ? localData.pages.flatMap((page) => page.data.items ?? [])
    : [];

  // 絵文字選択ハンドラー
  const handleEmojiSelect = (emoji: BlueMarilStellarGetEmojis.ItemView) => {
    handleReaction(emoji.ref.rkey, emoji.ref.repo, emoji.record);
    setIsOpen(false);
  };

  // 次のページを取得する関数
  const fetchNextPage = (type: "local" | "global") => {
    if (type === "local") {
      localFetchNextPage();
    } else {
      globalFetchNextPage();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div
        ref={modalRef}
        className="fixed bottom-0 left-0 right-0 z-50 bg-skin-base border-t border-gray-200 dark:border-gray-800 rounded-t-xl shadow-lg transform transition-transform duration-300 ease-in-out md:mx-auto md:w-1/2"
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        <div className="p-4">
          <Picker
            localOnly={!agent.did}
            global={globalEmojis}
            local={localEmojis}
            isLoading={{
              local: localIsLoading,
              global: globalIsLoading,
            }}
            handleEmojiSelect={handleEmojiSelect}
            fetchNextPage={fetchNextPage}
            hasNextPage={{
              local: !!localHasNextPage,
              global: !!globalHasNextPage,
            }}
            isFetchingNextPage={{
              local: localIsFetchingNextPage,
              global: globalIsFetchingNextPage,
            }}
          />
        </div>
      </div>
    </>
  );
}
