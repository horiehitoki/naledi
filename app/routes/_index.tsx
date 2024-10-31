import { LoaderFunction } from "@remix-run/node";
import * as Profile from "~/lexicon/types/app/bsky/actor/profile";
import { useLoaderData } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { getSessionAgent } from "~/utils/session";
import { Agent } from "@atproto/api";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);

  if (!agent) return null;

  //profileの取得
  const { data: profileRecord } = await agent.com.atproto.repo.getRecord({
    repo: agent.assertDid,
    collection: "app.bsky.actor.profile",
    rkey: "self",
  });

  const profile =
    Profile.isRecord(profileRecord.value) &&
    Profile.validateRecord(profileRecord.value).success
      ? profileRecord.value
      : {};

  //CIDからアイコンデータを取得
  let avatarUrl = null;

  if (profile.avatar) {
    const icon = await agent.com.atproto.sync.getBlob({
      did: agent.assertDid,
      cid: profile.avatar.ref,
    });

    //base64に変換
    const buffer = Buffer.from(icon.data);
    avatarUrl = `data:${icon.headers["content-type"]};base64,${buffer.toString(
      "base64"
    )}`;
  }

  return { profile, avatarUrl };
};

export default function Homepage() {
  const data = useLoaderData();

  if (data) {
    const profile = data.profile;
    const avatarUrl = data.avatarUrl;

    return (
      <div className="m-auto md:w-1/2 w-3/4 py-14">
        <Avatar className="w-36 h-36 m-auto">
          <AvatarImage src={avatarUrl || ""} />
          <AvatarFallback>{profile.displayName}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold text-center">
          Hi,{profile.displayName}!
        </h1>
        <h1 className="text-center py-10">{profile.description}</h1>

        <a href="/logout" className="my-5">
          <Button>ログアウト</Button>
        </a>
      </div>
    );
  }

  return (
    <div className="m-auto md:w-1/2 w-3/4 py-14">
      <h1 className="text-4xl font-bold text-center py-10">
        ログインしてください!
      </h1>

      <a href="/login" className="my-5 flex justify-center">
        <Button>ログイン</Button>
      </a>
    </div>
  );
}
