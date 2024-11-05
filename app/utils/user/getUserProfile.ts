import { Agent } from "@atproto/api";
import { getFollowers, getFollows } from "./getFollowStatus";
import { FollowRes } from "@types";

export async function getUserProfile(agent: Agent, did: string) {
  const res = await agent.getProfile({ actor: did });
  const feed = await agent.getAuthorFeed({ actor: did, limit: 50 });
  const follow: FollowRes = await getFollows(agent, did);
  const follower: FollowRes = await getFollowers(agent, did);

  const posts = feed.data;
  const profile = res.data;
  const avatarUrl = profile.avatar!;

  return { profile, avatarUrl, posts, follow, follower };
}
