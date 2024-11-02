import { Agent } from "@atproto/api";

export async function getFollowers(agent: Agent, did: string) {
  const followers = await agent.getFollowers({
    actor: did,
    limit: 50,
  });

  return followers.data.followers;
}

export async function getFollows(agent: Agent, did: string) {
  const follows = await agent.getFollows({
    actor: did,
    limit: 50,
  });

  return follows.data.follows;
}
