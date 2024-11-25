import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "~/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "./button";
import { Home, LogOut, Plus } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { sessionState } from "~/state/session";
import { PostDialog } from "../timeline/postDialog";
import { useToast } from "~/hooks/use-toast";
import { Toaster } from "./toaster";

export function AppSidebar() {
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

        <Toaster />

        <Sidebar className="p-5">
          <SidebarHeader className="space-y-4">
            <div>
              <a href="/home/">
                <Button>
                  <Home />
                  Home
                </Button>
              </a>
            </div>
            <div>
              <Button
                onClick={() => {
                  setPostOpen(!postOpen);
                }}
              >
                <Plus />
                投稿する
              </Button>
            </div>

            <ModeToggle />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup />
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter className="space-y-4">
            <a href={`/home/user?handle=${profile.handle}`}>
              <div className="flex">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={profile.avatar || ""} />
                  <AvatarFallback>
                    {profile.displayName?.[0]?.toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <h1 className="font-bold p-4">{profile.displayName}</h1>
              </div>
            </a>

            <a href="/logout">
              <Button>
                <LogOut />
                ログアウト
              </Button>
            </a>
          </SidebarFooter>
        </Sidebar>
      </div>
    );
}
