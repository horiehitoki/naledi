import { Button } from "~/components/ui/button";
import { Repeat2 } from "lucide-react";
import { usePost, useRepost } from "~/state/post";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export const RepostButton = ({ post }: { post: PostView }) => {
  const state = usePost(post.cid);
  const { repost, cancelRepost } = useRepost(post.cid);

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
