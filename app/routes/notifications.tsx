import Main from "~/components/layout/main";
import NotificationList from "~/components/notifications/notifications";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import NotFound from "~/components/ui/404";
import Alert from "~/components/ui/alert";
import { LoaderFunction, redirect } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (agent == null) return redirect("/login");

  return null;
};

export default function NotificationPage() {
  return (
    <Main>
      <NotificationList />
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
          <Alert message="通知を取得中にエラーが発生しました。" />
        )
      ) : (
        <Alert message="通知を取得中にエラーが発生しました。" />
      )}
    </div>
  );
}
