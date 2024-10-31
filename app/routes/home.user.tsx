import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { getSessionAgent } from "~/utils/auth/session";
import { resolver } from "~/utils/resolver";
import { useLoaderData } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getUserProfile } from "~/utils/user/getUserProfile";
import { ProfileData } from "@types";
import { Post } from "~/components/timeline/post"; // Import the Post component

export const loader = async ({ request }: ActionFunctionArgs) => {
  const agent = await getSessionAgent(request);
  if (!agent) return;

  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  if (!handle) return;

  // DIDのresolve
  const did = await resolver.resolvedHandleToDid(handle).catch(() => {
    throw new Error("Failed to resolve handle to DID");
  });

  const { profile, avatarUrl, posts } = await getUserProfile(agent, did);

  return json<ProfileData>({ profile, avatarUrl, posts });
};

export default function ProfilePage() {
  const data = useLoaderData<typeof loader>();

  if (!data) {
    return <div>No profile data available</div>;
  }

  return (
    <div>
      <Dialog defaultOpen>
        <DialogContent className="md:max-w-screen-xl md:w-full md:h-full overflow-scroll">
          <DialogHeader>
            <DialogTitle>
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
                <h1 className="font-bold text-2xl my-5">
                  {data.profile.displayName}
                </h1>
                <p className="my-5">
                  handle:{data.profile.handle}
                  <br />
                  {data.profile.did}
                </p>
                <p className="whitespace-pre-wrap">
                  {data.profile.description}
                </p>
              </div>
              <hr className="h-px my-8 bg-black border-0" />
            </DialogTitle>
          </DialogHeader>
          {data.posts.feed.map((postItem) => (
            <Post key={postItem.post.cid} post={postItem.post} />
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
