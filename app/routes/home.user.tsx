import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSessionAgent } from "~/utils/auth/session";
import { resolver } from "~/utils/resolver";
import { getUserProfile } from "~/utils/user/getUserProfile";

import { ProfileHeader, ProfileTabs } from "~/components/user/profile";
import { UserData } from "@types";

//ユーザーデータの取得
export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return null;

  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  if (!handle) return null;

  //ハンドルを解決
  const did = await resolver.resolvedHandleToDid(handle);

  const { profile, avatarUrl, follow, follower } = await getUserProfile(
    agent,
    did
  );

  return {
    profile,
    avatarUrl,
    follow,
    follower,
  };
};

export default function ProfilePage() {
  const data = useLoaderData<UserData>();

  if (!data) return null;

  return (
    <div
      className="overflow-y-auto m-auto md:w-3/4 h-[100vh]"
      id="scrollableTarget"
    >
      <ProfileHeader profile={data.profile} avatarUrl={data.avatarUrl} />

      <hr className="h-px my-8 bg-black dark:bg-white border-0" />

      <ProfileTabs data={data} />
    </div>
  );
}
