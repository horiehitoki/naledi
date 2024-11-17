import { Agent } from "@atproto/api";

export async function getUserProfile(agent: Agent, did: string) {
  const res = await agent.getProfile({ actor: did });

  const feed = await agent.getAuthorFeed({ actor: did, limit: 50 });

  const followsData = await agent.getFollows({
    actor: did,
    limit: 50,
  });
  const follow = {
    data: followsData.data.follows,
    cursor: followsData.data.cursor,
  };

  const followerData = await agent.getFollowers({
    actor: did,
    limit: 50,
  });
  const follower = {
    data: followerData.data.followers,
    cursor: followerData.data.cursor,
  };

  const emoji = await agent.com.atproto.repo.listRecords({
    repo: did,
    collection: "com.marukun-dev.pds.reaction",
  });

  const posts = feed.data;
  const profile = res.data;
  const avatarUrl = profile.avatar!;
  const reactionsData = emoji.data.records;

  const reactions = await Promise.all(
    reactionsData.map(async (reaction) => {
      const postData = await agent.app.bsky.feed.getPosts({
        uris: [reaction.value.subject.uri],
      });

      const post = postData.data.posts[0];

      return { reaction, post };
    })
  );

  return { profile, avatarUrl, posts, follow, follower, reactions };
}
