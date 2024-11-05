import { Agent } from "@atproto/api";
import { FollowRes } from "@types";

export async function getFollowers(
  agent: Agent,
  did: string
): Promise<FollowRes> {
  const followers = await agent.getFollowers({
    actor: did,
    limit: 50,
  });

  return { list: followers.data.followers, cursor: followers.data.cursor };
}

export async function getFollows(
  agent: Agent,
  did: string
): Promise<FollowRes> {
  const follows = await agent.getFollows({
    actor: did,
    limit: 50,
  });

  return { list: follows.data.follows, cursor: follows.data.cursor };
}
