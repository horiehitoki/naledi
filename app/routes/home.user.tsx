import { ActionFunctionArgs } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { resolver } from "~/utils/resolver";
import { useLoaderData } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getUserProfile } from "~/utils/user/getUserProfile";
import { Post } from "~/components/timeline/post";
import { useTimeline } from "~/hooks/useTimeline";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UserCard } from "~/components/user/userCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Window from "~/components/window";

export const loader = async ({ request }: ActionFunctionArgs) => {
  const agent = await getSessionAgent(request);
  if (!agent) return null;

  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  if (!handle) return null;

  const did = await resolver.resolvedHandleToDid(handle).catch(() => {
    throw new Error("Failed to resolve handle to DID");
  });

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

  const { posts, hasMore, loadMorePosts } = useTimeline({
    initialFeed: data?.feed || [],
    initialCursor: data?.cursor,
    fetchEndpoint: "/api/getUserPost",
    did: data!.profile.did,
  });

  if (!data) {
    return <div>No profile data available</div>;
  }

  return (
    <Window title={`${data.profile.displayName} のプロフィール`}>
      <div id="scrollable-timeline" className="space-y-8 h-full overflow-auto">
        {data.profile.banner ? (
          <img
            src={data.profile.banner}
            className="rounded-md"
            alt="banner"
          ></img>
        ) : (
          ""
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
            handle:{data.profile.handle}
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
              dataLength={posts.length}
              next={loadMorePosts}
              hasMore={hasMore}
              scrollableTarget="scrollable-timeline"
              loader={
                <div className="m-auto my-16 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              }
            >
              <div className="space-y-8">
                {posts.map((postItem) => {
                  const postData = postItem.post as PostView;

                  return <Post key={postData.cid} post={postData} />;
                })}
              </div>
            </InfiniteScroll>
          </TabsContent>
          <TabsContent value="follow" className="space-y-5">
            {data.follow.map((follow: unknown) => {
              return <UserCard key={follow.cid} data={follow} />;
            })}
          </TabsContent>
          <TabsContent value="follower" className="space-y-5">
            {data.follower.map((follower: unknown) => {
              return <UserCard key={follower.cid} data={follower} />;
            })}
          </TabsContent>
        </Tabs>
      </div>
    </Window>
  );
}
