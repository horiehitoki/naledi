import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";
import { getSessionAgent } from "~/utils/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return redirect("/login");

  return null;
};

export default function Homepage() {
  return (
    <div className="m-auto md:w-1/2 w-3/4 py-14">
      <Outlet />
    </div>
  );
}
