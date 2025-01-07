import { isDid } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Main from "~/components/layout/main";
import Profile from "~/components/profile/profile";
import Timeline from "~/components/timeline/timeline";
import { getSessionAgent } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request, params }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return new Response(null, { status: 400 });

  const { handle } = params;
  if (!handle) return new Response(null, { status: 404 });

  if (isDid(handle)) {
    const profile = await agent.getProfile({ actor: handle });

    return { profile, did: handle };
  }

  const did = await agent.com.atproto.identity.resolveHandle({ handle });
  const profile = await agent.getProfile({ actor: did.data.did });

  return { profile, did: did.data.did };
};

export default function Threads() {
  const { profile, did } = useLoaderData<typeof loader>();

  return (
    <Main>
      <Profile profile={profile.data} />
      <Timeline type="user" did={did} />
    </Main>
  );
}
