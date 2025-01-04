import { BlueMojiCollectionItem } from "~/generated/api";

export default function EmojiRender({
  record,
  repo,
}: {
  record: BlueMojiCollectionItem.ItemView;
  repo: string;
}) {
  return (
    <img
      src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${repo}/${
        record.formats.png_128!.ref.$link
      }@png`}
      alt={record.alt}
      className="w-6 h-6"
    />
  );
}
