"use client";
import { useAgent } from "@/app/providers/agent";
import { uploadBluemoji } from "@/lib/api/bluemoji/upload/UploadBluemoji";
import { FormEvent, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { RiUploadCloudFill } from "react-icons/ri";

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

  return (
    <div className="max-w-md mx-auto">
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
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
