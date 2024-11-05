import { ActionFunctionArgs } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { resolver } from "~/utils/resolver";
import { useLoaderData } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getUserProfile } from "~/utils/user/getUserProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UserCard } from "~/components/user/userCard";
import Window from "~/components/window";
import { useFollow } from "~/hooks/useFollow";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from "uuid";
import { useTimeline } from "~/hooks/useTimeline";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Post } from "~/components/timeline/post";

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
  const data = useLoaderData<typeof loader>()!;

  const { timeline, fetcher: timelineFetcher } = useTimeline([
    {
      id: uuidv4(),
      type: "user",
      did: data.profile.did,
      posts: [],
      hasMore: true,
    },
  ]);

  const { follow, follower, fetcher, hasMore } = useFollow({
    did: data.profile.did,
    initialFollow: data.follow,
    initialFollower: data.follower,
  });

  if (!data) return null;

  return (
    <Window title={`${data.profile.displayName} のプロフィール`}>
      <div id="scrollable-timeline" className="h-full overflow-auto">
        {data.profile.banner && (
          <img src={data.profile.banner} className="rounded-md" alt="banner" />
        )}

        <Avatar className="w-24 h-24">
          <AvatarImage src={data.avatarUrl || ""} />
          <AvatarFallback>
            {data.profile.displayName?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-8">
          <h1 className="font-bold text-2xl">{data.profile.displayName}</h1>
          <p>
            handle: {data.profile.handle}
            <br />
            {data.profile.did}
          </p>
          <p className="whitespace-pre-wrap">{data.profile.description}</p>
          <div className="flex space-x-4">
            <h1 className="font-bold text-2xl">
              フォロー {data.profile.followsCount}
            </h1>
            <h1 className="font-bold text-2xl">
              フォロワー {data.profile.followersCount}
            </h1>
          </div>
        </div>

        <hr className="h-px my-8 bg-black dark:bg-white border-0" />

        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger value="posts">投稿</TabsTrigger>
            <TabsTrigger value="follow">フォロー</TabsTrigger>
            <TabsTrigger value="follower">フォロワー</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <InfiniteScroll
              dataLength={timeline[0].posts.length}
              next={() => timelineFetcher(timeline[0])}
              hasMore={timeline[0].hasMore}
              scrollableTarget="scrollable-timeline"
              loader={
                <div className="m-auto my-16 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              }
            >
              <div className="space-y-8">
                {timeline[0].posts.map((postItem) => {
                  const postData = postItem.post as PostView;
                  return <Post key={postData.cid} post={postData} />;
                })}
              </div>
            </InfiniteScroll>
          </TabsContent>
          <TabsContent
            value="follow"
            id="follow"
            className="h-full overflow-auto"
          >
            <InfiniteScroll
              dataLength={follow.length}
              next={() => fetcher("follow")}
              hasMore={hasMore.follow}
              scrollableTarget="scrollable-timeline"
              loader={
                <div className="m-auto my-16 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              }
            >
              <div className="space-y-8">
                {follow.map((profile) => (
                  <UserCard key={profile.did ?? profile.cid} data={profile} />
                ))}
              </div>
            </InfiniteScroll>
          </TabsContent>
          <TabsContent
            value="follower"
            id="follower"
            className="space-y-5 h-full overflow-auto"
          >
            <InfiniteScroll
              dataLength={follower.length}
              next={() => fetcher("follower")}
              hasMore={hasMore.follower}
              scrollableTarget="scrollable-timeline"
              loader={
                <div className="m-auto my-16 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              }
            >
              <div className="space-y-8">
                {follower.map((profile) => (
                  <UserCard key={profile.did ?? profile.cid} data={profile} />
                ))}
              </div>
            </InfiniteScroll>
          </TabsContent>
        </Tabs>
      </div>
    </Window>
  );
}
