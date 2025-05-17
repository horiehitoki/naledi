"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import Link from "next/link";
import ComposeButton from "@/components/actions/composeButton/ComposeButton";
import { useClientModeState } from "@/state/client";

interface Props {
  handle: string;
  avatar?: string;
}

export default function Aside(props: Props) {
  const { handle, avatar } = props;
  const mode = useClientModeState();

  return (
    <aside
      className={`${mode === "default" ? "sticky h-full" : "absolute right-5 z-50 bg-skin-base rounded-full"} top-6 hidden md:block`}
    >
      <div className="flex flex-col items-center gap-3 lg:flex-row border border-skin-base p-2 rounded-full">
        <ComposeButton />
        <Link
          href={`/profile/${handle}`}
          className="max-w-[7rem] truncate hover:brightness-90"
        >
          <Avatar src={avatar?.replace("avatar", "avatar_thumbnail")} />
        </Link>
      </div>
    </aside>
  );
}
