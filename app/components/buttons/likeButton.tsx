import { Button } from "~/components/ui/button";
import { Heart } from "lucide-react";
import { PostView } from "~/generated/api/types/app/bsky/feed/defs";
import { usePost, useSetPost } from "~/state/post";

export const LikeButton = ({ post }: { post: PostView }) => {
  const state = usePost(post.cid);
  const setState = useSetPost(post.cid);

  async function like() {
    const res = await fetch("/api/create/like/", {
      method: "POST",
      body: JSON.stringify({ uri: post.uri, cid: post.cid }),
    });
    const json = await res.json();
    setState((prev) => ({
      ...prev,
      isLiked: true,
      likeUri: json.uri,
      likeCount: prev.likeCount + 1,
    }));
    return res;
  }

  async function cancelLike() {
    const res = await fetch("/api/delete/like/", {
      method: "POST",
      body: JSON.stringify({ likeUri: state.likeUri }),
    });
    setState((prev) => ({
      ...prev,
      isLiked: false,
      likeUri: "",
      likeCount: prev.likeCount - 1,
    }));
    return res;
  }

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
