export default function EmojiRender({
  cid,
  alt,
  repo,
}: {
  cid: string;
  alt: string;
  repo: string;
}) {
  return (
    <img
      src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${repo}/${cid}@png`}
      alt={alt}
      className="w-6 h-6"
    />
  );
}
