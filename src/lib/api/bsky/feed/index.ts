import { type Agent, AppBskyActorDefs, AppBskyFeedDefs } from "@atproto/api";
import { getAgentFromServer } from "../agent";
import {
  SavedFeed,
  Thread,
  ThreadViewPostWithReaction,
} from "../../../../../types/feed";
import feedWithReaction from "@/lib/utils/feedWithReactions";
import { getReactions } from "../../stellar";
import { Reaction } from "../../../../../types/atmosphere/types/blue/maril/stellar/getReactions";
import {
  BlockedPost,
  NotFoundPost,
  PostView,
  ThreadViewPost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export const getPopularFeeds = async (search?: string, agent?: Agent) => {
  if (!agent) agent = await getAgentFromServer();
  const popularFeeds = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    query: search,
  });

  if (!popularFeeds.success) {
    throw new Error("Couldn't get popular feeds");
  }

  return popularFeeds.data.feeds;
};

export const getSavedFeeds = async (agent?: Agent): Promise<SavedFeed[]> => {
  if (!agent) agent = await getAgentFromServer();
  const prefs = await agent.app.bsky.actor.getPreferences();
  if (!prefs.success) throw new Error("Could not fetch feeds");

  const feedsPref = prefs.data.preferences.find(
    (pref) =>
      AppBskyActorDefs.isSavedFeedsPref(pref) &&
      AppBskyActorDefs.validateSavedFeedsPref(pref).success
  ) as AppBskyActorDefs.SavedFeedsPref | undefined;

  if (!feedsPref || feedsPref.saved.length === 0) return [];

  const generators = await agent.app.bsky.feed.getFeedGenerators({
    feeds: feedsPref.saved,
  });
  if (!generators.success) {
    throw new Error("Could not fetch feed generators");
  }

  return generators.data.feeds.map((feed) => ({
    ...feed,
    pinned: feedsPref.pinned.includes(feed.uri),
  }));
};

export const togglePinFeed = async (agent: Agent, feed: string) => {
  const prefs = await agent.app.bsky.actor.getPreferences();
  if (!prefs.success) throw new Error("Could not fetch feeds");

  for (const pref of prefs.data.preferences) {
    if (
      AppBskyActorDefs.isSavedFeedsPref(pref) &&
      AppBskyActorDefs.validateSavedFeedsPref(pref).success
    ) {
      if (pref.pinned.includes(feed)) {
        pref.pinned = pref.pinned.filter((f) => f !== feed);
      } else {
        pref.pinned.push(feed);
      }
    }
  }

  return await agent.app.bsky.actor.putPreferences({
    preferences: prefs.data.preferences,
  });
};

export const toggleSaveFeed = async (agent: Agent, feed: string) => {
  const prefs = await agent.app.bsky.actor.getPreferences();
  if (!prefs.success) throw new Error("Could not fetch feeds");

  for (const pref of prefs.data.preferences) {
    if (
      AppBskyActorDefs.isSavedFeedsPref(pref) &&
      AppBskyActorDefs.validateSavedFeedsPref(pref).success
    ) {
      if (pref.saved.includes(feed)) {
        pref.pinned = pref.pinned.filter((f) => f !== feed);
        pref.saved = pref.saved.filter((f) => f !== feed);
      } else {
        pref.saved.push(feed);
      }
    }
  }

  return await agent.app.bsky.actor.putPreferences({
    preferences: prefs.data.preferences,
  });
};

export const likeFeed = async (agent: Agent, uri: string, cid: string) => {
  const like = await agent.like(uri, cid);
  return like;
};

export const unlikeFeed = async (agent: Agent, likeUri: string) => {
  await agent.deleteLike(likeUri);
};

export const getTimeline = async (agent: Agent, cursor?: string) => {
  const timeline = await agent.getTimeline({ cursor: cursor });
  const processedFeed = await feedWithReaction(timeline.data.feed);

  return {
    ...timeline,
    data: {
      cursor: timeline.data.cursor,
      feed: processedFeed,
    },
  };
};

export const getFeed = async (agent: Agent, uri: string, cursor: string) => {
  const feed = await agent.app.bsky.feed.getFeed({ feed: uri, cursor: cursor });
  const processedFeed = await feedWithReaction(feed.data.feed);

  return {
    ...feed,
    data: {
      cursor: feed.data.cursor,
      feed: processedFeed,
    },
  };
};

export const getFeedInfo = async (uri: string, agent?: Agent) => {
  if (!agent) agent = await getAgentFromServer();
  const feed = await agent.app.bsky.feed.getFeedGenerator({ feed: uri });
  if (!feed.success) throw new Error("Could not fetch feed info");
  return feed.data;
};

export const getUserPosts = async (
  agent: Agent,
  handle: string,
  cursor: string
) => {
  const posts = await agent.getAuthorFeed({
    actor: handle,
    cursor: cursor,
    filter: "posts_no_replies",
    includePins: true,
  });

  if (!posts.success) throw new Error("Could not fetch posts");
  const processedFeed = await feedWithReaction(posts.data.feed);

  return {
    ...posts,
    data: {
      cursor: posts.data.cursor,
      feed: processedFeed,
    },
  };
};

export const getUserReplyPosts = async (
  agent: Agent,
  handle: string,
  cursor: string
) => {
  const posts = await agent.getAuthorFeed({
    actor: handle,
    filter: "posts_with_replies",
    cursor: cursor,
  });

  const processedFeed = await feedWithReaction(posts.data.feed);

  if (!posts.success) throw new Error("Could not fetch replies");
  return {
    ...posts,
    data: {
      cursor: posts.data.cursor,
      feed: processedFeed,
    },
  };
};

export const getUserMediaPosts = async (
  agent: Agent,
  handle: string,
  cursor: string
) => {
  const posts = await agent.getAuthorFeed({
    actor: handle,
    filter: "posts_with_media",
    cursor: cursor,
  });
  const processedFeed = await feedWithReaction(posts.data.feed);

  if (!posts.success) throw new Error("Could not fetch media posts");
  return {
    ...posts,
    data: {
      cursor: posts.data.cursor,
      feed: processedFeed,
    },
  };
};

export const getUserLikes = async (
  agent: Agent,
  handle: string,
  cursor: string
) => {
  if (!agent) agent = await getAgentFromServer();
  const likes = await agent.app.bsky.feed.getActorLikes({
    actor: handle,
    cursor: cursor,
  });
  const processedFeed = await feedWithReaction(likes.data.feed);

  if (!likes.success) throw new Error("Could not fetch likes");
  return {
    ...likes,
    data: {
      cursor: likes.data.cursor,
      feed: processedFeed,
    },
  };
};

export const likePost = async (agent: Agent, uri: string, cid: string) => {
  try {
    const like = await agent.like(uri, cid);
    return like;
  } catch (e) {
    throw new Error("Could not like post");
  }
};

export const unlikePost = async (agent: Agent, likeUri: string) => {
  try {
    const unlike = await agent.deleteLike(likeUri);
    return unlike;
  } catch (e) {
    throw new Error("Could not unlike post");
  }
};

export const repost = async (agent: Agent, uri: string, cid: string) => {
  try {
    const like = await agent.repost(uri, cid);
    return like;
  } catch (e) {
    throw new Error("Could not repost");
  }
};

export const unRepost = async (agent: Agent, repostUri: string) => {
  try {
    const unlike = await agent.deleteRepost(repostUri);
    return unlike;
  } catch (e) {
    throw new Error("Could not delete repost");
  }
};

export const removePost = async (agent: Agent, uri: string) => {
  try {
    const post = await agent.deletePost(uri);
    return post;
  } catch (e) {
    throw new Error("Could not delete post");
  }
};

export const getPost = async (agent: Agent, uri: string) => {
  try {
    const post = await agent.getPostThread({ uri: uri, depth: 1 });
    if (!post.success) throw new Error("Could not fetch post");
    return post;
  } catch (e) {
    throw new Error("Could not fetch post");
  }
};

export const getPostThread = async (
  uri: string,
  agent?: Agent
): Promise<ThreadViewPostWithReaction> => {
  if (!agent) agent = await getAgentFromServer();

  try {
    const posts = await agent.getPostThread({ uri: uri });
    const thread = posts.data.thread as ThreadViewPost;
    const parent = thread?.parent as AppBskyFeedDefs.ThreadViewPost;
    const post = thread.post as PostView;
    const replies = thread?.replies as AppBskyFeedDefs.ThreadViewPost[];

    const res = await getReactions(post.uri, post.cid, 20);
    const postWithReactions = { post, reactions: res.data.reactions };

    //再帰的にリアクションを取得
    async function getNestedReactions(
      replies: ThreadViewPostWithReaction[]
    ): Promise<ThreadViewPostWithReaction[]> {
      return await Promise.all(
        replies.map(async (reply) => {
          const res = await getReactions(reply.post.uri, reply.post.cid, 20);

          let nestedReplies = [] as ThreadViewPostWithReaction[];

          if (reply.replies) {
            nestedReplies = await getNestedReactions(
              reply.replies as ThreadViewPostWithReaction[]
            );
          }

          return {
            ...reply,
            reactions: res.data.reactions,
            replies: nestedReplies,
          };
        })
      );
    }

    //再帰的に親投稿のリアクションを取得
    async function getParentReactions(
      parent: ThreadViewPostWithReaction
    ): Promise<ThreadViewPostWithReaction> {
      const res = await getReactions(parent.post.uri, parent.post.cid, 20);

      let nestedParent;

      if (parent.parent) {
        nestedParent = await getParentReactions(
          parent.parent as ThreadViewPostWithReaction
        );
      }

      return {
        ...parent,
        reactions: res.data.reactions,
        parent: nestedParent,
      };
    }

    const repliesWithReactions = await getNestedReactions(
      replies as ThreadViewPostWithReaction[]
    );

    if (parent) {
      const parentWithReactions = await getParentReactions(
        parent as ThreadViewPostWithReaction
      );

      return {
        ...thread,
        ...postWithReactions,
        replies: repliesWithReactions,
        parent: parentWithReactions,
      } as ThreadViewPostWithReaction;
    }

    return {
      ...thread,
      ...postWithReactions,
      replies: repliesWithReactions,
    } as ThreadViewPostWithReaction;
  } catch (e) {
    console.log(e);

    throw e;
  }
};

export const getPostLikes = async (
  agent: Agent,
  uri: string,
  cursor: string
) => {
  try {
    const likes = await agent.getLikes({ uri: uri, cursor: cursor, limit: 50 });
    return likes.data;
  } catch (e) {
    throw new Error("Could not fetch post likes");
  }
};

export const getPostReposts = async (
  agent: Agent,
  uri: string,
  cursor: string
) => {
  try {
    const likes = await agent.getRepostedBy({
      uri: uri,
      cursor: cursor,
      limit: 50,
    });
    return likes.data;
  } catch (e) {
    throw new Error("Could not fetch post reposts");
  }
};

export const getPostQuotes = async (
  agent: Agent,
  uri: string,
  cursor: string
) => {
  try {
    const quotes = await agent.app.bsky.feed.getQuotes({
      uri: uri,
      cursor: cursor,
      limit: 50,
    });
    return quotes.data;
  } catch (e) {
    throw new Error("Could not fetch post quotes");
  }
};
