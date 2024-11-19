import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import InfiniteScroll from "react-infinite-scroll-component";
import { Post } from "~/components/timeline/post";
import { UserCard } from "~/components/user/userCard";
import { User, Users, UserCircle, Plus, Delete } from "lucide-react";
import { LoadingSpinner } from "../ui/loading";
import { ProfileView } from "~/generated/api/types/app/bsky/actor/defs";
import { Twemoji } from "react-emoji-render";
import { ReactionData } from "@types";
import { Button } from "../ui/button";
import { useOutletContext } from "@remix-run/react";

export function ProfileHeader({
  profile,
  avatarUrl,
}: {
  profile: ProfileView;
  avatarUrl: string;
}) {
  async function follow() {
    const res = await fetch("/api/create/follow/", {
      method: "POST",
      body: JSON.stringify({ did: profile.did }),
    });

    return res;
  }

  async function deleteFollow() {
    const res = await fetch("/api/delete/follow/", {
      method: "POST",
      body: JSON.stringify({ followUri: profile.viewer!.following }),
    });

    return res;
  }

  const context = useOutletContext<{ profile: ProfileView }>();

  return (
    <Card>
      <div>
        {profile.banner! && (
          <div className="h-48">
            <img
              src={profile.banner as string}
              className="w-full object-cover h-48"
              alt="banner"
            />
          </div>
        )}
        <Avatar className="w-24 h-24 border-4 border-white shadow-lg m-6">
          <AvatarImage src={avatarUrl || ""} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
            {profile.displayName?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>

        {profile.did !== context.profile.did ? (
          <div>
            {profile.viewer?.following ? (
              <div className="flex justify-end mx-12">
                <Button onClick={deleteFollow}>
                  <Delete /> フォロー解除
                </Button>
              </div>
            ) : (
              <div className="flex justify-end mx-12">
                <Button onClick={follow}>
                  <Plus /> フォロー
                </Button>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      <CardContent className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {profile.displayName}
          </h1>

          <div className="items-center space-x-2 text-muted-foreground mt-1">
            <span>@{profile.handle}</span>
            <Badge variant="secondary" className="text-xs">
              {profile.did}
            </Badge>
          </div>
        </div>

        {profile.description && (
          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {profile.description}
          </p>
        )}

        <div className="flex space-x-6 pt-2">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div>
              <span className="font-semibold">
                {profile.followsCount as string}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                フォロー
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <UserCircle className="w-4 h-4 text-muted-foreground" />
            <div>
              <span className="font-semibold">
                {profile.followersCount as string}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                フォロワー
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileTabs({
  timeline,
  timelineFetcher,
  follow,
  follower,
  fetcher,
  hasMore,
  reactions,
}: any) {
  return (
    <Tabs defaultValue="posts">
      <div className="flex justify-center overflow-x-scroll">
        <TabsList className="border-b rounded-none h-12 bg-transparent p-0">
          <TabsTrigger
            value="posts"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <User className="w-4 h-4 mr-2" />
            投稿
          </TabsTrigger>
          <TabsTrigger
            value="follow"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <Users className="w-4 h-4 mr-2" />
            フォロー
          </TabsTrigger>
          <TabsTrigger
            value="follower"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <UserCircle className="w-4 h-4 mr-2" />
            フォロワー
          </TabsTrigger>
          <TabsTrigger
            value="reactions"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <UserCircle className="w-4 h-4 mr-2" />
            リアクション
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="posts" className="mt-6">
        <InfiniteScroll
          dataLength={timeline.posts.length}
          next={() => timelineFetcher(timeline)}
          hasMore={timeline.hasMore}
          scrollableTarget="scrollableTarget"
          loader={<LoadingSpinner />}
        >
          <div className="space-y-4">
            {timeline.posts.map((data: any) => {
              return <Post key={data.post.cid} data={data} />;
            })}
          </div>
        </InfiniteScroll>
      </TabsContent>

      <TabsContent value="follow" className="mt-6">
        <InfiniteScroll
          dataLength={follow.length}
          next={() => fetcher("follow")}
          hasMore={hasMore.follow}
          scrollableTarget="scrollableTarget"
          loader={<LoadingSpinner />}
        >
          <div className="space-y-4">
            {follow.map((profile: ProfileView) => (
              <UserCard key={profile.did ?? profile.cid} data={profile} />
            ))}
          </div>
        </InfiniteScroll>
      </TabsContent>

      <TabsContent value="follower" className="mt-6">
        <InfiniteScroll
          dataLength={follower.length}
          next={() => fetcher("follower")}
          hasMore={hasMore.follower}
          scrollableTarget="scrollableTarget"
          loader={<LoadingSpinner />}
        >
          <div className="space-y-4">
            {follower.map((profile: ProfileView) => (
              <UserCard key={profile.did ?? profile.cid} data={profile} />
            ))}
          </div>
        </InfiniteScroll>
      </TabsContent>

      <TabsContent value="reactions" className="mt-6">
        <div className="space-y-4">
          {reactions.map((data: ReactionData) => {
            return (
              <div key={data.reaction.cid}>
                <Twemoji
                  text={`:${data.reaction.emoji.replace(/\s+/g, "_")}:`}
                  className="text-center text-3xl flex justify-center my-12"
                />
                <Post data={data} />
              </div>
            );
          })}
        </div>
      </TabsContent>
    </Tabs>
  );
}
