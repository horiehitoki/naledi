import { Button } from "~/components/ui/button";
import { Heart } from "lucide-react";
import { usePost } from "~/state/post";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export const LikeButton = ({ post }: { post: PostView }) => {
  const state = usePost(post.cid);

  return state.isLiked ? (
    <Button variant="ghost" size="sm" onClick={cancelLike}>
      <Heart className="w-4 h-4 mr-1 text-red-500 fill-red-500" />
      <span className="text-xs">{state.likeCount}</span>
    </Button>
  ) : (
    <Button
      variant="ghost"
      size="sm"
      className="hover:text-red-500 hover:bg-red-50"
      onClick={like}
    >
      <Heart className="w-4 h-4 mr-1" />
      <span className="text-xs">{state.likeCount}</span>
    </Button>
  );
};
