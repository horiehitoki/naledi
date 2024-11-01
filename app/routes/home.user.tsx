import { ActionFunctionArgs, json } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { resolver } from "~/utils/resolver";
import { useLoaderData } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getUserProfile } from "~/utils/user/getUserProfile";
import { ProfileData } from "@types";
import { Post } from "~/components/timeline/post";
import { useTimeline } from "~/hooks/useTimeline";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export const loader = async ({ request }: ActionFunctionArgs) => {
  const agent = await getSessionAgent(request);
  if (!agent) return null;

  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  if (!handle) return null;

  const did = await resolver.resolvedHandleToDid(handle).catch(() => {
    throw new Error("Failed to resolve handle to DID");
  });

  const { profile, avatarUrl, posts } = await getUserProfile(agent, did);

  return json<ProfileData>({ profile, avatarUrl, posts });
};

export default function ProfilePage() {
  const data = useLoaderData<typeof loader>();

  const timeline = {
    feed: data!.posts.feed,
    cursor: data!.posts.cursor,
  };

  const { posts, isLoading, currentCursor, loadMoreRef } = useTimeline({
    initialFeed: timeline.feed || [],
    initialCursor: timeline.cursor,
    fetchEndpoint: `/api/getUserPost`,
    did: data!.profile.did,
  });

  if (!data) {
    return <div>No profile data available</div>;
  }

  return (
    <div>
      {data.profile.banner ? (
        <img
          src={data.profile.banner}
          className="rounded-md"
          alt="banner"
        ></img>
      ) : (
        ""
      )}
      <Avatar className="w-24 h-24 my-7">
        <AvatarImage src={data.avatarUrl || ""} />
        <AvatarFallback>
          {data.profile.displayName?.[0]?.toUpperCase() || "?"}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="font-bold text-2xl my-5">{data.profile.displayName}</h1>
        <p className="my-5">
          handle:{data.profile.handle}
          <br />
          {data.profile.did}
        </p>
        <p className="whitespace-pre-wrap">{data.profile.description}</p>
      </div>
      <hr className="h-px my-8 bg-black border-0" />
      {posts.map((postItem) => {
        const postData = postItem.post as PostView;

        return <Post key={postData.cid} post={postData} />;
      })}

      {currentCursor && (
        <div
          ref={loadMoreRef}
          className="w-full h-20 flex items-center justify-center"
        >
          {isLoading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          )}
        </div>
      )}
    </div>
  );
}
