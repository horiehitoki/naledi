import {
  BellIcon,
  HomeIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { useProfile } from "~/state/profile";

export default function FooterMenu() {
  const profile = useProfile();

  if (profile)
    return (
      <div>
        <nav className="fixed bottom-0 left-0 z-50 w-full bg-background border-t dark:border-muted">
          <div className="container flex items-center justify-around py-2">
            <a
              href="/"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <HomeIcon className="w-6 h-6" />
            </a>
            <a
              href="/"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <SearchIcon className="w-6 h-6" />
            </a>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <PlusIcon className="w-6 h-6" />
            </button>
            <a
              href="/"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <BellIcon className="w-6 h-6" />
            </a>
            <a
              href={`/${profile.handle}`}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <UserIcon className="w-6 h-6" />
            </a>
          </div>
        </nav>
      </div>
    );
}
