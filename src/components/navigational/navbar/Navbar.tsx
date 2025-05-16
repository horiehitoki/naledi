"use client";

import NavItem from "./NavItem";
import { usePathname } from "next/navigation";
import {
  BiHome,
  BiSolidHome,
  BiPlanet,
  BiSolidPlanet,
  BiCog,
  BiSolidCog,
  BiSquareRounded,
  BiColumns,
} from "react-icons/bi";
import { PiMagnifyingGlassBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { HiClipboardList, HiOutlineClipboardList } from "react-icons/hi";
import { FaBell, FaRegBell } from "react-icons/fa6";
import { getUnreadNotificationsCount } from "@/lib/api/bsky/notification";
import { useQuery } from "@tanstack/react-query";
import { useAgent } from "@/app/providers/agent";
import { FaRegSmile, FaSmile } from "react-icons/fa";
import { useClientModeState, useSetClientModeState } from "@/state/client";

export default function Navbar() {
  const agent = useAgent();
  const pathname = usePathname();

  const clientMode = useClientModeState();
  const setClientMode = useSetClientModeState();

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
    <nav className="inline-flex flex-col gap-5 lg:ml-1.5">
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
        href="/feeds"
        icon={<BiPlanet className="text-2xl md:text-3xl" />}
        activeIcon={<BiSolidPlanet className="text-2xl md:text-3xl" />}
        title="Feeds"
        isActive={pathname === "/dashboard/feeds"}
      />
      <NavItem
        href="/lists"
        icon={<HiOutlineClipboardList className="text-2xl md:text-3xl" />}
        activeIcon={<HiClipboardList className="text-2xl md:text-3xl" />}
        title="Lists"
        isActive={pathname === "/dashboard/lists"}
      />
      <NavItem
        href="/notifications"
        icon={<FaRegBell className="text-2xl md:text-3xl" />}
        activeIcon={<FaBell className="text-2xl md:text-3xl" />}
        title="Notifications"
        isActive={pathname.includes("notifications")}
        badge={notificationsCount ?? 0}
      />
      <NavItem
        href="/bluemoji"
        icon={<FaRegSmile className="text-2xl md:text-3xl" />}
        activeIcon={<FaSmile className="text-2xl md:text-3xl" />}
        title="Bluemoji"
        isActive={pathname.includes("bluemoji")}
      />
      <NavItem
        href="/settings"
        icon={<BiCog className="text-2xl md:text-3xl" />}
        activeIcon={<BiSolidCog className="text-2xl md:text-3xl" />}
        title="Settings"
        isActive={pathname.includes("settings")}
      />
      <button
        className="hover:text-skin-base flex items-center text-skin-secondary gap-3"
        onClick={() => {
          setClientMode(clientMode === "Default" ? "Deck" : "Default");
        }}
      >
        <div className="relative text-2xl md:text-3xl">
          {clientMode === "Default" ? <BiSquareRounded /> : <BiColumns />}
        </div>
        <span className={`hidden text-lg font-medium lg:inline`}>
          {clientMode === "Default" ? "Default" : "Deck"}
        </span>
      </button>
    </nav>
  );
}
