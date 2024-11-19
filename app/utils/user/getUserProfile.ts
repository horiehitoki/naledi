import { Agent } from "@atproto/api";
import { prisma } from "../db/prisma";

export async function getUserProfile(agent: Agent, did: string) {
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
  const avatarUrl = profile.avatar;

  //ユーザーのリアクション一覧を取得
  const reactionsData = await prisma.reaction.findMany({
    where: {
      createdBy: did,
    },
  });

  //投稿データとセットで返す
  const reactions = await Promise.all(
    reactionsData.map(async (reaction) => {
      const post = await agent.getPosts({ uris: [reaction.uri] });

      return {
        reaction: { cid: reaction.cid, emoji: reaction.emoji },
        post: post.data.posts[0],
      };
    })
  );

  return { profile, avatarUrl, follow, follower, reactions };
}
