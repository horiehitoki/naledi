"use client";
import { useAgent } from "@/app/providers/agent";
import { uploadBluemoji } from "@/lib/utils/bluemoji/upload/UploadBluemoji";
import { getEmojis } from "@/lib/api/stellar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BiTrash } from "react-icons/bi";
import BluemojiForm from "@/components/forms/BluemojiForm";

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
        setError("Please enter an emoji name.");
        setIsLoading(false);

        return;
      }

      const cleanValue = name.replace(/:/g, "");
      name = `:${cleanValue}:`;

      const matches = name.match(/:((?!.*--)[A-Za-z0-9-]{4,20}(?<!-)):/);

      if (!matches || matches[0] !== name) {
        setError("Invalid emoji name.");
        setIsLoading(false);

        return;
      }

      if (file.type !== "image/png") {
        setError("Only PNG files can be uploaded.");
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

      window.location.reload();
    } catch (e) {
      console.log(e);

      setError("Failed to upload emoji.");
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

  const { data } = useInfiniteQuery({
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
    <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
      Bluemoji
    </h2>
    <div className="max-w-4xl mx-auto p-6 space-y-8">

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-8">
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Upload Bluemoji
        </h3>

        <BluemojiForm isLoading={isLoading} error={error} onSubmit={onSubmit} />
      </div>

      {emojis.length > 0 && (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-8">
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          My Bluemoji
        </h3>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-8">

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {emojis.map((emoji) => (
              <div
                key={emoji.ref.rkey}
                className="relative group rounded-xl p-4 transition-all duration-200 hover:scale-105 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <Image
                      src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${emoji.ref.repo}/${emoji.record.formats.png_128.ref.$link}@png`}
                      alt={emoji.record.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>

                  <p className="text-sm font-medium text-skin-base">
                    :{emoji.ref.rkey}:
                  </p>

                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="bg-red-500 hover:bg-red-600 w-8 h-8 rounded-full transition-colors">
                        <BiTrash className="mx-auto text-white" />
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="bg-skin-base rounded-lg border border-slate-200 dark:border-slate-700 p-4"
                        sideOffset={5}
                      >
                        <p className="text-sm text-skin-base mb-4">
                          Are you sure you want to delete this?
                        </p>
                        <button
                          onClick={() => deleteBluemoji(emoji.ref.rkey)}
                          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-2 px-4 transition-colors flex items-center justify-center space-x-2"
                        >
                          <BiTrash />
                          <span>Delete</span>
                        </button>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
