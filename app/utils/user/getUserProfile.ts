import { Agent } from "@atproto/api";
import { UserData } from "@types";

export async function getUserProfile(
  agent: Agent,
  did: string
): Promise<UserData> {
  const res = await agent.getProfile({ actor: did });

  //フォロー/フォロワーの取得
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

  const profile = res.data;
  const avatarUrl = profile.avatar ?? "";

  return { profile, avatarUrl, follow, follower };
}
