import { LoaderFunction, redirect } from "@remix-run/node";
import Main from "~/components/layout/main";
import Timeline from "~/components/timeline/timeline";
import { getSessionAgent } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (agent == null) return redirect("/login");

  return null;
};

export default function Index() {
  return (
    <Main>
      <Timeline type="home" did={null} />
    </Main>
  );
}
