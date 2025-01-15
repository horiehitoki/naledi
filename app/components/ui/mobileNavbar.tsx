import { Home, Search, Bell, User } from "lucide-react";
import { useProfile } from "~/state/profile";
import { useUnread } from "~/state/unread";
import PostButton from "../buttons/postButton";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export default function FooterMenu() {
  const profile = useProfile();
  const unreadCount = useUnread();

  if (!profile) return null;

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-background border-t dark:border-muted">
      <div className="container flex items-center justify-around py-2">
        <Button variant="ghost" size="icon" asChild>
          <a href="/" aria-label="ホーム">
            <Home className="h-6 w-6" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a href="/search" aria-label="検索">
            <Search className="h-6 w-6" />
          </a>
        </Button>
        <PostButton />
        <Button variant="ghost" size="icon" asChild>
          <a href="/notifications" aria-label="通知" className="relative">
            <Bell className="h-6 w-6" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5"
              >
                {unreadCount}
              </Badge>
            )}
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a href={`/user/${profile.handle}/posts`} aria-label="プロフィール">
            <User className="h-6 w-6" />
          </a>
        </Button>
      </div>
    </nav>
  );
}
