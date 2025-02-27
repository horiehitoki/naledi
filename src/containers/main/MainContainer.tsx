"use client";

import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import SidePanel from "@/components/navigational/sidePanel/SidePanel";
import Aside from "@/components/navigational/aside/Aside";
import AppBar from "@/components/navigational/appBar/AppBar";
import TopBar from "@/components/navigational/topBar/TopBar";
import Composer from "@/components/actions/composer/Composer";
import { useClientModeState } from "@/state/client";
import { usePathname } from "next/navigation";

export default function MainContainer({
  profile,
  children,
}: {
  profile: ProfileViewDetailed | undefined;
  children: React.ReactNode;
}) {
  const mode = useClientModeState();
  const pathname = usePathname();
  const isHome = pathname === "/dashboard/home";
  return (
    <main
      className={`
      bg-skin-base flex animate-fade
      ${
        mode === "default"
          ? "justify-center pb-12 md:mt-6 gap-6"
          : isHome
            ? "ml-5"
            : "ml-5 mt-6"
      }
      lg:gap-16
    `}
    >
      {profile && <Composer author={profile} />}
      <SidePanel />

      <section
        className={`
        ${
          mode === "default"
            ? "w-full md:max-w-xl"
            : isHome
              ? "flex-1 overflow-x-auto"
              : "w-full md:w-1/3 md:mx-auto"
        }
      `}
      >
        <div>
          {profile && <TopBar profile={profile} />}
          {children}
        </div>
      </section>

      {profile && <Aside avatar={profile?.avatar} handle={profile?.handle} />}
      <AppBar />
    </main>
  );
}
