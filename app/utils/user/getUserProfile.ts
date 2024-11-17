import { Agent } from "@atproto/api";
import { getFollowers, getFollows } from "./getFollowStatus";
import { FollowRes } from "@types";

export async function getUserProfile(agent: Agent, did: string) {
  const res = await agent.getProfile({ actor: did });

  const feed = await agent.getAuthorFeed({ actor: did, limit: 50 });

  const follow: FollowRes = await getFollows(agent, did);
  const follower: FollowRes = await getFollowers(agent, did);
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
