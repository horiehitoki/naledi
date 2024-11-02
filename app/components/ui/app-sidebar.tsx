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
import { SetStateAction } from "react";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

type Props = {
  profile: ProfileView;
  open: boolean;
  SetOpen: React.Dispatch<SetStateAction<boolean>>;
};

export function AppSidebar(props: Props) {
  return (
    <Sidebar className="p-5 z-0">
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
              props.SetOpen(!props.open);
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
        <a href={`/home/user?handle=${props.profile.handle}`}>
          <div className="flex">
            <Avatar className="w-12 h-12">
              <AvatarImage src={props.profile.avatar || ""} />
              <AvatarFallback>
                {props.profile.displayName?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <h1 className="font-bold p-4">{props.profile.displayName}</h1>
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
  );
}
