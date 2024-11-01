import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, redirect, useLoaderData } from "@remix-run/react";
import { getSessionAgent } from "~/utils/auth/session";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/ui/app-sidebar";
import { getUserProfile } from "~/utils/user/getUserProfile";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);

  if (agent == null) return redirect("/login");

  const { profile, avatarUrl } = await getUserProfile(agent, agent.assertDid);

  return { profile, avatarUrl };
};

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  if (!data) return null;

  return (
    <SidebarProvider>
      {data && <AppSidebar profile={data.profile} avatarUrl={data.avatarUrl} />}
      <SidebarTrigger />
      <div className="m-auto md:w-1/2 w-3/4 py-14">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
