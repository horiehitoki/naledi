import { BlueMarilStellarGetEmojis } from "../../../../types/atmosphere";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";

export default function Picker({
  localOnly,
  global,
  local,
  isLoading,
  handleEmojiSelect,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  localOnly: boolean;
  global: BlueMarilStellarGetEmojis.ItemView[];
  local: BlueMarilStellarGetEmojis.ItemView[];
  isLoading: { local: boolean; global: boolean };
  handleEmojiSelect: (emoji: BlueMarilStellarGetEmojis.ItemView) => void;
  fetchNextPage: (type: "local" | "global") => void;
  hasNextPage: { local: boolean; global: boolean };
  isFetchingNextPage: { local: boolean; global: boolean };
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"local" | "global">("local");

  // 検索フィルター
  const filteredGlobalEmojis = global.filter((emoji) =>
    emoji.ref.rkey.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLocalEmojis = local.filter((emoji) =>
    emoji.ref.rkey.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (
    (activeTab === "local" && isLoading.local) ||
    (activeTab === "global" && isLoading.global)
  ) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (
    (activeTab === "local" && local.length === 0) ||
    (activeTab === "global" && global.length === 0)
  ) {
    return (
      <div className="py-8 text-center text-skin-base">Bluemoji not found.</div>
    );
  }

  return (
    <div className="w-full text-skin-base">
      <div className="relative mb-2">
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          <BiSearch className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Bluemoji..."
          className="w-full pl-8 pr-4 py-1.5 text-sm rounded-md border border-transparent focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors text-skin-base bg-skin-base"
        />
      </div>

      <Tabs.Root
        defaultValue="local"
        onValueChange={(value) => setActiveTab(value as "local" | "global")}
      >
        <Tabs.TabsList className="w-full grid grid-cols-2 mb-2">
          <Tabs.TabsTrigger
            value="local"
            className="px-4 py-2 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 transition-colors"
          >
            My Bluemoji
            {filteredLocalEmojis.length > 0 &&
              ` (${filteredLocalEmojis.length})`}
          </Tabs.TabsTrigger>

          {!localOnly && (
            <Tabs.TabsTrigger
              value="global"
              className="px-4 py-2 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 transition-colors"
            >
              Global Bluemoji
              {filteredGlobalEmojis.length > 0 &&
                ` (${filteredGlobalEmojis.length})`}
            </Tabs.TabsTrigger>
          )}
        </Tabs.TabsList>
        <Tabs.TabsContent value="local">
          {filteredLocalEmojis.length > 0 ? (
            <EmojiGrid
              emojis={filteredLocalEmojis}
              onEmojiSelect={handleEmojiSelect}
            />
          ) : (
            <div className="py-8 text-center">
              {searchQuery
                ? "No search results found."
                : "My Bluemoji not found."}
            </div>
          )}

          {!searchQuery && hasNextPage.local && (
            <div className="mt-2 pt-2 border-t dark:border-gray-700">
              <button
                onClick={() => fetchNextPage("local")}
                disabled={isFetchingNextPage.local}
                className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                {isFetchingNextPage.local ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </Tabs.TabsContent>
        {!localOnly && (
          <Tabs.TabsContent value="global">
            {filteredGlobalEmojis.length > 0 ? (
              <EmojiGrid
                emojis={filteredGlobalEmojis}
                onEmojiSelect={handleEmojiSelect}
              />
            ) : (
              <div className="py-8 text-center">No search results found.</div>
            )}

            {!searchQuery && hasNextPage.global && (
              <div className="mt-2 pt-2 border-t dark:border-gray-700">
                <button
                  onClick={() => fetchNextPage("global")}
                  disabled={isFetchingNextPage.global}
                  className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  {isFetchingNextPage.global ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </Tabs.TabsContent>
        )}
      </Tabs.Root>
    </div>
  );
}

const EmojiGrid = ({
  emojis,
  onEmojiSelect,
}: {
  emojis: BlueMarilStellarGetEmojis.ItemView[];
  onEmojiSelect: (emoji: BlueMarilStellarGetEmojis.ItemView) => void;
}) => (
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
