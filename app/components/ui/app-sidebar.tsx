import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "~/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "./button";
import { LogOut, Plus } from "lucide-react";
import { ProfileData } from "@types";

export function AppSidebar(props: ProfileData) {
  return (
    <Sidebar>
      <SidebarHeader className="mx-4">
        <a href="/home/post" className="my-5">
          <Button>
            <Plus />
            投稿
          </Button>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="mx-4">
        <a href={`/home/user?handle=${props.profile.handle}`}>
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
