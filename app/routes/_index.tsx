import { LoaderFunction, redirect } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { HomeIcon, Smile } from "lucide-react";
import Main from "~/components/layout/main";
import Timeline from "~/components/timeline/timeline";
import NotFound from "~/components/ui/404";
import Alert from "~/components/ui/alert";
import UriTabs from "~/components/ui/uriTabs";
import { getSessionAgent } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (agent == null) return redirect("/login");

  return null;
};

export default function Index() {
  const tabs = [
    {
      path: "/",
      label: "ホーム",
      icon: HomeIcon,
    },
    {
      path: "/reactedPosts",
      label: "リアクション付き",
      icon: Smile,
    },
  ];

  return (
    <Main>
      <UriTabs tabs={tabs} />

      <Timeline type="home" did={null} />
    </Main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      {isRouteErrorResponse(error) ? (
        error.status === 404 ? (
          <NotFound />
        ) : (
          <Alert message="タイムラインの取得中にエラーが発生しました。" />
        )
      ) : (
        <Alert message="タイムラインの取得中にエラーが発生しました。" />
      )}
    </div>
  );
}
