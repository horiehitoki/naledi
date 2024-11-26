import { Button } from "~/components/ui/button";
import { Heart } from "lucide-react";
import { PostView } from "~/generated/api/types/app/bsky/feed/defs";
import { useLike, usePost } from "~/state/post";

export const LikeButton = ({ post }: { post: PostView }) => {
  const state = usePost(post.cid);
  const { like, cancelLike } = useLike(post.cid);

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
