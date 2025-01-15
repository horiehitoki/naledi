import { Notification } from "@atproto/api/dist/client/types/app/bsky/notification/listNotifications";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "~/hooks/useNotifications";
import { NotificationCard } from "./notificationsCard";
import Alert from "~/components/ui/alert";
import { useSetUnread } from "~/state/unread";

export default function NotificationList() {
  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useNotifications();

  const setUnread = useSetUnread();

  const notifications = data?.pages.flatMap((page) => page.notifications) ?? [];
  const unreadCount = notifications.filter(
    (notification: Notification) => !notification.isRead
  ).length;

  useEffect(() => {
    const updateSeen = async () => {
      if (unreadCount > 0 && notifications.length > 0) {
        try {
          setUnread(0);

          await fetch("/api/notifications/", {
            method: "POST",
          });
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
        } catch (error) {
          console.error("Failed to update seen status:", error);
        }
      }
    };

    updateSeen();
  }, [unreadCount, notifications.length, queryClient, setUnread]);

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  if (isError) {
    return <Alert message="通知の取得に失敗しました。" />;
  }

  if (notifications.length <= 0) {
    return (
      <h1 className="text-2xl font-bold text-center my-12">
        通知はありません。
      </h1>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="bg-blue-500 px-3 py-1 rounded-full text-sm">
          {unreadCount} unread
        </div>
      </div>
      <InfiniteScroll
        dataLength={notifications.length}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<div>loading...</div>}
      >
        <div>
          {notifications.map((notification: Notification) => (
            <NotificationCard
              key={notification.uri}
              notification={notification}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
