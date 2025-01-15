import Main from "~/components/layout/main";
import NotificationList from "~/components/notifications/notifications";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import NotFound from "~/components/ui/404";
import Alert from "~/components/ui/alert";

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
