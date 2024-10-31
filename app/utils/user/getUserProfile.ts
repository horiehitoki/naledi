import { Agent } from "@atproto/api";
//import * as Profile from "~/lexicon/types/app/bsky/actor/profile";

export async function getUserProfile(agent: Agent, did: string) {
  //アイコンなどが取得できなかったためいったん保留
  /* 
  // プロファイルの取得
  const profileResponse = await agent.com.atproto.repo
    .getRecord({
      repo: did,
      collection: "app.bsky.actor.profile",
      rkey: "self",
    })
    .catch(() => {
      throw new Error("Failed to fetch profile");
    });

  // プロファイルデータの検証
  if (
    !Profile.isRecord(profileResponse.data.value) ||
    !Profile.validateRecord(profileResponse.data.value).success
  ) {
    throw new Error("Invalid profile data");
  }

  const profile = profileResponse.data.value;
  let avatarUrl = null;

  // アバター画像の取得
  if (profile.avatar?.ref) {
    try {
      const icon = await agent.com.atproto.sync.getBlob({
        did: did,
        cid: profile.avatar.ref,
      });

      if (icon.data && icon.headers["content-type"]) {
        const buffer = Buffer.from(icon.data);
        avatarUrl = `data:${
          icon.headers["content-type"]
        };base64,${buffer.toString("base64")}`;
      }
    } catch (error) {
      console.error("Failed to fetch avatar:", error);
    }
  }
  */

  const res = await agent.getProfile({ actor: did });
  const feed = await agent.getAuthorFeed({ actor: did });

  const posts = feed.data;
  const profile = res.data;
  const avatarUrl = profile.avatar!;

  return { profile, avatarUrl, posts };
}
