export default function EmojiRender({
  cid,
  name,
  repo,
}: {
  cid: string;
  name: string;
  repo: string;
}) {
  return (
    <img
      src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${repo}/${cid}@png`}
      alt={name}
      className="w-6 h-6"
    />
  );
}
