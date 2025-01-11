import { Agent } from "@atproto/api";
import {
  FeedViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { ReactionAgent } from "../agent/reactionAgent";

export default async function feedWithReaction(
  feed: FeedViewPost[] | PostView[],
  agent: Agent
) {
  const data = await Promise.all(
    feed.map(async (item: FeedViewPost | PostView) => {
      const reactionAgent = new ReactionAgent(agent);
      if (item.post) {
        const post = item as FeedViewPost;

        const reactions = await reactionAgent.get(
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
        const reactions = await reactionAgent.get(post.uri, post.cid, 50);

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
