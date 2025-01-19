import {
  FeedViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { ReactionXrpc } from "../reaction/reactionXrpc";

//feedにリアクションデータをつけて返す
export default async function feedWithReaction(
  feed: FeedViewPost[] | PostView[]
) {
  const xrpc = new ReactionXrpc();

  const data = await Promise.all(
    feed.map(async (item: FeedViewPost | PostView) => {
      if (item.post) {
        const post = item as FeedViewPost;

        const reactions = await xrpc.getReactions(
          post.post.uri,
          post.post.cid,
          50
        );

        if (!reactions) return null;

        return {
          ...post,
          reactions: reactions.data.reactions,
        };
      } else {
        const post = item as PostView;
        const reactions = await xrpc.getReactions(post.uri, post.cid, 50);

        if (!reactions) return null;

        return {
          ...post,
          reactions: reactions.data.reactions,
        };
      }
    })
  );
  return data;
}
