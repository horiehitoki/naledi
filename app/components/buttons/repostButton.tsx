import { Button } from "~/components/ui/button";
import { Repeat2 } from "lucide-react";
import { PostView } from "~/generated/api/types/app/bsky/feed/defs";
import { usePost, useSetPost } from "~/state/post";

export const RepostButton = ({ post }: { post: PostView }) => {
  const state = usePost(post.cid);
  const setState = useSetPost(post.cid);

  async function repost() {
    const res = await fetch("/api/create/repost/", {
      method: "POST",
      body: JSON.stringify({ uri: post.uri, cid: post.cid }),
    });
    const json = await res.json();
    setState((prev) => ({
      ...prev,
      isReposted: true,
      repostUri: json.uri,
      repostCount: prev.repostCount + 1,
    }));
    return res;
  }

  async function cancelRepost() {
    const res = await fetch("/api/delete/repost/", {
      method: "POST",
      body: JSON.stringify({ repostUri: state.repostUri }),
    });
    setState((prev) => ({
      ...prev,
      isReposted: false,
      repostUri: "",
      repostCount: prev.repostCount - 1,
    }));
    return res;
  }

  return state.isReposted ? (
    <Button variant="ghost" size="sm" onClick={cancelRepost}>
      <Repeat2 className="w-4 h-4 mr-1 text-green-500" />
      <span className="text-xs">{state.repostCount}</span>
    </Button>
  ) : (
    <Button
      variant="ghost"
      size="sm"
      className="hover:text-green-500 hover:bg-green-50"
      onClick={repost}
    >
      <Repeat2 className="w-4 h-4 mr-1" />
      <span className="text-xs">{state.repostCount}</span>
    </Button>
  );
};
