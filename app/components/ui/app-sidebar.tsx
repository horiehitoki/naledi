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
import { ProfileData } from "@types";
import { ModeToggle } from "./mode-toggle";

export function AppSidebar(props: ProfileData) {
  return (
    <Sidebar>
      <SidebarHeader className="mx-4">
        <a href="/home/" className="my-5">
          <Button>
            <Home />
            Home
          </Button>
        </a>
        <a href="/home/post">
          <Button>
            <Plus />
            投稿
          </Button>
        </a>
        <ModeToggle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="mx-4">
        <a href={`/user?handle=${props.profile.handle}`}>
          <div className="flex">
            <Avatar className="w-12 h-12">
              <AvatarImage src={props.avatarUrl || ""} />
              <AvatarFallback>
                {props.profile.displayName?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <h1 className="font-bold mx-4 my-4">{props.profile.displayName}</h1>
          </div>
        </a>

        <a href="/logout" className="my-5">
          <Button>
            <LogOut />
            ログアウト
          </Button>
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}
