import {
  FeedViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Reaction } from "~/generated/api/types/app/netlify/stellarbsky/getReaction";

export default async function feedWithReaction(
  feed: FeedViewPost[] | PostView[]
) {
  return await Promise.all(
    feed.map(async (item: FeedViewPost | PostView) => {
      if (item.post) {
        const post = item as FeedViewPost;

        const res = await fetch(
          `${process.env.APPVIEW_URL}/xrpc/app.netlify.stellarbsky.getReaction?uri=${post.post.uri}&cid=${post.post.cid}&limit=50`
        );

        const json: { reactions: Reaction[] } = await res.json();

        return {
          ...post,
          reactions: json.reactions,
        };
      } else {
        const post = item as PostView;

        const res = await fetch(
          `${process.env.APPVIEW_URL}/xrpc/app.netlify.stellarbsky.getReaction?uri=${post.uri}&cid=${post.cid}&limit=50`
        );

        const json: { reactions: Reaction[] } = await res.json();

        return {
          ...post,
          reactions: json.reactions,
        };
      }
    })
  );
}
