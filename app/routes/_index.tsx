import { LoaderFunction } from "@remix-run/node"; // jsonとLoaderFunctionをインポート
import { getIronSession } from "iron-session";
import { Agent } from "@atproto/api";
import { client } from "~/utils/auth/client";
import { Session } from "@types";
import * as Profile from "~/lexicon/types/app/bsky/actor/profile";
import { useLoaderData } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

async function getSessionAgent(req: Request) {
  const response = new Response();

  const session = await getIronSession<Session>(req, response, {
    cookieName: "sid",
    password: process.env.SESSION_SECRET!,
  });

  if (!session.did) return null;
  try {
    const oauthSession = await client.restore(session.did);
    return oauthSession ? new Agent(oauthSession) : null;
  } catch (err) {
    console.warn({ err }, "oauth restore failed");
    await session.destroy();
    return null;
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);

  if (!agent) return null;

  // Fetch additional information about the logged-in user
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

  return profile;
};

export default function Homepage() {
  const profile: any = useLoaderData();

  if (profile) {
    const blob = new Blob([profile.avatar]);
    const iconURL = URL.createObjectURL(blob);

    return (
      <div className="m-auto md:w-1/2 w-3/4 py-14">
        <h1 className="text-4xl font-bold text-center">
          Hi,{profile.displayName}!
        </h1>
        <h1 className="text-center py-10">{profile.description}</h1>

        <Avatar>
          <AvatarImage src={iconURL} />
          <AvatarFallback>{profile.displayName}</AvatarFallback>
        </Avatar>

        <a href="/logout" className="my-5">
          <Button>ログアウト</Button>
        </a>
      </div>
    );
  }

  return (
    <div>
      (
      <div className="m-auto md:w-1/2 w-3/4 py-14">
        <h1 className="text-4xl font-bold text-center py-10">
          ログインしてください!
        </h1>

        <a href="/login" className="my-5 flex justify-center">
          <Button>ログイン</Button>
        </a>
      </div>
      )
    </div>
  );
}
