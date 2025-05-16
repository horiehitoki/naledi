"use client";

import { usePathname } from "next/navigation";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Link from "next/link";
import NavItem from "../navbar/NavItem";
import { getUnreadNotificationsCount } from "@/lib/api/bsky/notification";
import { useQuery } from "@tanstack/react-query";
import { BiHome, BiCog, BiSolidHome, BiSolidCog } from "react-icons/bi";
import { PiMagnifyingGlassBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { FaRegBell } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { HiClipboardList, HiOutlineClipboardList } from "react-icons/hi";
import { useAgent } from "@/app/providers/agent";

export default function AppBar() {
  const pathname = usePathname();
  const agent = useAgent();

  const {
    data: notificationsCount,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["notificationsCount"],
    queryFn: async () => {
      return getUnreadNotificationsCount(agent);
    },
    refetchInterval: 10000,
  });

  return (
    <nav className="bg-skin-base border-skin-base fixed bottom-0 z-40 flex w-full justify-between gap-6 overflow-auto border-t px-6 pb-8 pt-1 transition-all ease-linear md:hidden">
      <NavItem
        href="/home"
        icon={<BiHome className="text-2xl md:text-3xl" />}
        activeIcon={<BiSolidHome className="text-2xl md:text-3xl" />}
        title="Home"
        isActive={pathname === "/home"}
      />
      <NavItem
        href="/search"
        icon={<PiMagnifyingGlassBold className="text-2xl md:text-3xl" />}
        activeIcon={<PiMagnifyingGlassFill className="text-2xl md:text-3xl" />}
        title="Search"
        isActive={pathname.includes("search")}
      />
      <NavItem
        href="/settings"
        icon={<BiCog className="text-2xl md:text-3xl" />}
        activeIcon={<BiSolidCog className="text-2xl md:text-3xl" />}
        title="Settings"
        isActive={pathname === "/settings"}
      />
      <NavItem
        href="/notifications"
        icon={<FaRegBell className="text-2xl md:text-3xl" />}
        activeIcon={<FaBell className="text-2xl md:text-3xl" />}
        title="Notifications"
        isActive={pathname.includes("notifications")}
        badge={notificationsCount ?? 0}
      />
      <Link
        href={`/profile/${profile?.handle}`}
        className="hover:brightness-90"
      >
        <Avatar
          src={profile.avatar?.replace("avatar", "avatar_thumbnail")}
          size="sm"
        />
      </Link>
    </nav>
  );
}
