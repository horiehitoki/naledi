import { Home, Bell, Smile, SearchIcon, LogOut } from "lucide-react";
import { useProfile } from "~/state/profile";
import PostButton from "../buttons/postButton";
import { useUnread } from "~/state/unread";
import { Badge } from "./badge";

export default function SideBar() {
  const profile = useProfile();
  const unreadCount = useUnread();

  return (
    <div className="min-h-screen w-64 pt-12 fixed flex flex-col">
      {profile ? (
        <div className="flex-grow space-y-6">
          <a href={`/user/${profile.handle}/posts`}>
            <img
              src={profile.avatar}
              alt="icon"
              className="rounded-full w-24 h-24"
            />
          </a>
          <a
            href={`/`}
            className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg cursor-pointer"
          >
            <Home size={24} />
            <span className="text-lg font-medium">Home</span>
          </a>
          <a
            href={`/search`}
            className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg cursor-pointer"
          >
            <SearchIcon size={24} />
            <span className="text-lg font-medium">Search</span>
          </a>
          <a
            className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg cursor-pointer"
            href="/notifications"
          >
            <Bell size={24} />
            <span className="text-lg font-medium">Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-auto">
                {unreadCount}
              </Badge>
            )}
          </a>
          <a
            href={`/emoji/list`}
            className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg cursor-pointer"
          >
            <Smile size={24} />
            <span className="text-lg font-medium">Bluemoji</span>
          </a>
          <div>
            <PostButton />
          </div>
        </div>
      ) : (
        ""
      )}

      {profile && (
        <div className="mt-auto mb-24">
          <a
            href={`/logout`}
            className="flex items-center space-x-4 bg-red-500 p-2 rounded-lg cursor-pointer w-32"
          >
            <LogOut size={24} />
            <span className="text-lg font-medium">Logout</span>
          </a>
        </div>
      )}
    </div>
  );
}
