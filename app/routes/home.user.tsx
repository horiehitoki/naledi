import { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from "uuid";

import { getSessionAgent } from "~/utils/auth/session";
import { resolver } from "~/utils/resolver";
import { getUserProfile } from "~/utils/user/getUserProfile";
import { useFollow } from "~/hooks/useFollow";
import { useTimeline } from "~/hooks/useTimeline";

import { ProfileHeader } from "~/components/user/profile";
import { ProfileTabs } from "~/components/user/profile";

export const loader = async ({ request }: ActionFunctionArgs) => {
  const agent = await getSessionAgent(request);
  if (!agent) return null;

  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  if (!handle) return null;

  const did = await resolver.resolvedHandleToDid(handle);
  const { profile, avatarUrl, posts, follow, follower } = await getUserProfile(
    agent,
    did
  );

  return {
    profile,
    avatarUrl,
    feed: posts.feed,
    cursor: posts.cursor,
    follow,
    follower,
  };
};

export default function ProfilePage() {
  const data = useLoaderData<typeof loader>();

  const { timeline, fetcher: timelineFetcher } = useTimeline([
    {
      id: uuidv4(),
      type: "user",
      did: data!.profile.did ?? null,
      posts: [],
      hasMore: true,
    },
  ]);

  const { follow, follower, fetcher, hasMore } = useFollow({
    did: data!.profile.did!,
    initialFollow: data!.follow,
    initialFollower: data!.follower,
  });

  if (!data) return null;

  //TODO いい感じに
  return (
    <div id="scrollable-timeline" className="h-full overflow-auto m-auto">
      <ProfileHeader profile={data.profile} avatarUrl={data.avatarUrl} />

      <hr className="h-px my-8 bg-black dark:bg-white border-0" />

      <ProfileTabs
        timeline={timeline[0]}
        timelineFetcher={timelineFetcher}
        follow={follow}
        follower={follower}
        fetcher={fetcher}
        hasMore={hasMore}
      />
    </div>
  );
}
