"use client";
import { useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getEmojis } from "@/lib/api/stellar";
import { BlueMarilStellarGetEmojis } from "../../../../types/atmosphere";
import Button from "@/components/actions/button/Button";
import { BiSmile } from "react-icons/bi";
import { useAgent } from "@/app/providers/agent";
import Picker from "@/components/dataDisplay/bluemoji/Picker";

export default function BluemojiAutoComplete({
  onEmojiSelect,
}: {
  onEmojiSelect: (emoji: string) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const agent = useAgent();
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    data: localData,
    isLoading: localIsLoading,
    fetchNextPage: localFetchNextPage,
    hasNextPage: localHasNextPage,
    isFetchingNextPage: localIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["emojis", "local", agent.assertDid],
    enabled: !!agent.assertDid,
    queryFn: async ({ pageParam }) => {
      return await getEmojis(20, pageParam, agent.assertDid);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.data.cursor,
  });

  const localEmojis = localData
    ? localData.pages.flatMap((page) => page.data.items ?? [])
    : [];

  const handleEmojiSelect = (emoji: BlueMarilStellarGetEmojis.ItemView) => {
    onEmojiSelect(`:${emoji.ref.rkey}:`);
    setShowPicker(false);
  };

  const fetchNextPage = (type: "local" | "global") => {
    if (type === "local") {
      localFetchNextPage();
    }
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
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setShowPicker(false)}
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
                localOnly={true}
                local={localEmojis}
                global={[]}
                isLoading={{ local: localIsLoading, global: false }}
                handleEmojiSelect={handleEmojiSelect}
                fetchNextPage={fetchNextPage}
                hasNextPage={{ local: !!localHasNextPage, global: false }}
                isFetchingNextPage={{
                  local: localIsFetchingNextPage,
                  global: false,
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
