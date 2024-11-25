import {
  BellIcon,
  HomeIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { useRecoilValue } from "recoil";
import { useToast } from "~/hooks/use-toast";
import { sessionState } from "~/state/session";
import { PostDialog } from "../timeline/postDialog";
import { useState } from "react";

export default function FooterMenu() {
  const { toast } = useToast();

  const [postOpen, setPostOpen] = useState(false);

  const profile = useRecoilValue(sessionState);

  //投稿完了時のtoast
  const handlePostSubmit = () => {
    setPostOpen(false);
    toast({
      title: "投稿完了✅",
      description: "ポストが投稿されました",
    });
  };

  if (profile)
    return (
      <div>
        <PostDialog
          open={postOpen}
          onOpenChange={setPostOpen}
          onSubmit={handlePostSubmit}
        />

        <nav className="fixed bottom-0 left-0 z-50 w-full bg-background border-t dark:border-muted">
          <div className="container flex items-center justify-around py-2">
            <a
              href="/home"
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
            <button
              onClick={() => {
                setPostOpen(!postOpen);
              }}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <PlusIcon className="w-6 h-6" />
            </button>
            <a
              href="/"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <BellIcon className="w-6 h-6" />
            </a>
            <a
              href={`/home/user?handle=${profile.handle}`}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <UserIcon className="w-6 h-6" />
            </a>
          </div>
        </nav>
      </div>
    );
}
