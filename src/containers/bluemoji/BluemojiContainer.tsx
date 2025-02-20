"use client";
import { useAgent } from "@/app/providers/agent";
import { uploadBluemoji } from "@/lib/api/bluemoji/upload/UploadBluemoji";
import { getEmojis } from "@/lib/api/stellar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { RiUploadCloudFill } from "react-icons/ri";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BiTrash } from "react-icons/bi";

export default function BluemojiContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const agent = useAgent();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const alt = formData.get("alt") as string;
      const file = formData.get("file") as File;

      let name = formData.get("name") as string;

      if (!name?.trim()) {
        setError("絵文字名を入力してください。");
        setIsLoading(false);

        return;
      }

      const cleanValue = name.replace(/:/g, "");
      name = `:${cleanValue}:`;

      const matches = name.match(/:((?!.*--)[A-Za-z0-9-]{4,20}(?<!-)):/);

      if (!matches || matches[0] !== name) {
        setError("無効な絵文字名です。");
        setIsLoading(false);

        return;
      }

      if (file.type !== "image/png") {
        setError("PNGファイルのみアップロード可能です。");
        setIsLoading(false);

        return;
      }

      const arrayBuffer = await file.arrayBuffer();

      await uploadBluemoji({
        agent,
        emoji: arrayBuffer,
        alttext: alt,
        emojiName: name,
      });

      setIsLoading(false);
    } catch (e) {
      console.log(e);

      setError("絵文字のアップロードに失敗しました。");
      setIsLoading(false);

      return;
    }
  }

  async function deleteBluemoji(rkey: string) {
    await agent.com.atproto.repo.deleteRecord({
      collection: "blue.moji.collection.item",
      rkey,
      repo: agent.assertDid,
    });

    window.location.reload();
  }

  const {
    data,
    isLoading: isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
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

  return (
    <div className="max-w-md mx-auto text-skin-base">
      {emojis.length > 0 && (
        <div>
          <h2 className="text-2xl text-center font-bold text-blue-600">
            アップロード済みのBluemoji
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {emojis.map((emoji) => (
              <div
                key={emoji.ref.rkey}
                className="rounded-xl p-4 transition-all duration-200 hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-3 border border-slate-200 dark:border-slate-700"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <Image
                    src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${emoji.ref.repo}/${emoji.record.formats.png_128.ref.$link}@png`}
                    alt={emoji.record.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>

                <p className="text-sm font-medium">:{emoji.ref.rkey}:</p>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="bg-red-500 w-6 h-6 rounded-md">
                      <BiTrash className="mx-auto" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="DropdownMenuContent bg-skin-base border border-slate-200 dark:border-slate-700 rounded-md"
                      sideOffset={5}
                    >
                      <DropdownMenu.Item className="DropdownMenuItem text-skin-base">
                        <div className="p-4">
                          本当に削除しますか?
                          <button
                            onClick={() => deleteBluemoji(emoji.ref.rkey)}
                            className="bg-red-500 w-12 h-12 rounded-md flex items-center justify-center hover:bg-red-600 transition-colors mx-auto mt-4"
                          >
                            <BiTrash className="w-8 h-8" />
                          </button>
                        </div>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            ))}
          </div>
        </div>
      )}

      <form className="p-6 space-y-6 rounded-lg shadow-md" onSubmit={onSubmit}>
        <h2 className="text-2xl text-center font-bold text-blue-600">
          Upload Bluemoji
        </h2>

        <div className="space-y-2">
          <label htmlFor="name" className="block font-medium">
            Emoji name
          </label>
          <input
            id="name"
            name="name"
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-skin-base bg-skin-base"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="alt" className="block font-medium">
            Alt
          </label>
          <input
            id="alt"
            name="alt"
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-skin-base bg-skin-base"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="file" className="block font-medium">
            File
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/png"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading && !error ? (
            <>
              <LoaderIcon className="mr-2 h-5 w-5 animate-spin" />
              Uploading....
            </>
          ) : (
            <>
              <RiUploadCloudFill className="mr-2 h-5 w-5" />
              Upload
            </>
          )}
        </button>
      </form>

      <h1 className="text-red-500">{error && error}</h1>
    </div>
  );
}
