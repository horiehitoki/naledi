import { LoaderFunction, redirect } from "@remix-run/node";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";
import { ListIcon, UploadIcon } from "lucide-react";
import Main from "~/components/layout/main";
import NotFound from "~/components/ui/404";
import Alert from "~/components/ui/alert";
import UriTabs from "~/components/ui/uriTabs";
import { getSessionAgent } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (agent == null) return redirect("/login");

  return null;
};

export default function EmojiSettings() {
  const tabs = [
    {
      path: "/emoji/list",
      label: "Bluemojiの管理",
      icon: ListIcon,
    },
    {
      path: "/emoji/upload",
      label: "アップロード",
      icon: UploadIcon,
    },
  ];

  return (
    <Main>
      <div>
        <h1 className="text-center text-2xl font-bold mb-6">Bluemoji設定</h1>
        <UriTabs tabs={tabs} />
        <div>
          <Outlet />
        </div>
      </div>
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
          <Alert message="エラーが発生しました。" />
        )
      ) : (
        <Alert message="エラーが発生しました。" />
      )}
    </div>
  );
}
