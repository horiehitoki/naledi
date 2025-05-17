import { FormEventHandler } from "react";
import { LoaderIcon } from "react-hot-toast";
import { RiUploadCloud2Fill } from "react-icons/ri";

export default function BluemojiForm({
  onSubmit,
  isLoading,
  error,
}: {
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  error: string;
}) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 text-skin-base"
          >
            Emoji Name
          </label>
          <input
            id="name"
            name="name"
            required
            disabled={isLoading}
            placeholder="Enter emoji name (4-20 characters)"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-skin-base text-skin-base transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="alt"
            className="block text-sm font-medium mb-2 text-skin-base"
          >
            Alt Text
          </label>
          <input
            id="alt"
            name="alt"
            required
            disabled={isLoading}
            placeholder="Describe your emoji"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-skin-base text-skin-base transition-colors"
          />
        </div>

        <div>
          <div>
            <label htmlFor="file" className="text-skin-base">
              <input
                id="file"
                name="file"
                type="file"
                accept="image/png"
                required
                disabled={isLoading}
              />
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg border border-red-500 text-red-500">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 rounded-full text-white font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <LoaderIcon className="mr-2 h-5 w-5 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <RiUploadCloud2Fill className="mr-2 h-5 w-5" />
            Upload Bluemoji
          </>
        )}
      </button>
    </form>
  );
}
