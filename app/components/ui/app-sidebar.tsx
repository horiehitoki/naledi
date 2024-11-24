import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "~/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "./button";
import { Home, LogOut, Plus, Settings } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { SetStateAction, useState } from "react";
import AddTimeline from "../timeline/addTimelineDialog";
import { ProfileView } from "~/generated/api/types/app/bsky/actor/defs";

type Props = {
  profile: ProfileView;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export function AppSidebar(props: Props) {
  const [addTimelineOpen, setAddTimelineOpen] = useState(false);

  return (
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
              props.setOpen(!props.open);
            }}
          >
            <Plus />
            投稿する
          </Button>
        </div>

        <div>
          <Button
            onClick={() => {
              setAddTimelineOpen(!addTimelineOpen);
            }}
          >
            <Settings />
            タイムラインの設定
          </Button>
        </div>

        <ModeToggle />
        <AddTimeline open={addTimelineOpen} setOpen={setAddTimelineOpen} />
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
