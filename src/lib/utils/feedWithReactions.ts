import {
  FeedViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { getReactions } from "../api/stellar";
import { FeedViewPostWithReaction } from "../../../types/feed";
//feedにリアクションデータをつけて返す
export default async function feedWithReaction(
  feed: FeedViewPost[] | PostView[]
): Promise<FeedViewPostWithReaction[]> {
  const data = await Promise.all(
    feed.map(async (item: FeedViewPost | PostView) => {
      if (item.post) {
        const post = item as FeedViewPost;

        const reactions = await getReactions(post.post.uri, post.post.cid, 20);

        const result: FeedViewPostWithReaction = {
          ...post,
          reactions: reactions.data.reactions ?? [],
        };

        return result;
      } else {
        const post = item as PostView;
        const reactions = await getReactions(post.uri, post.cid, 20);

        const result: FeedViewPostWithReaction = {
          post: post,
          reactions: reactions.data.reactions ?? [],
        };

        return result;
      }
    })
  );

  return data;
}
