"use client";

import Button from "@/components/actions/button/Button";
import Image from "next/image";
import Link from "next/link";
import { BiPlanet } from "react-icons/bi";

interface Props {
  profile: ProfileViewDetailed;
}

export default function TopBar(props: Props) {
  const { profile } = props;

  return (
    <div className="bg-skin-base border-skin-base sticky top-0 z-[60] flex items-center justify-between border-b px-3 py-2.5 transition-all ease-linear md:hidden">
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline"
      >
        <div className="flex items-center gap-2 group">
          <Image
            src="/mark.svg"
            alt="gunjo logo"
            width={30}
            height={30}
          />
        </div>{" "}
      </Button>
      <Link href="/feeds">
        <BiPlanet className="text-skin-icon-muted hover:text-skin-icon-base text-2xl md:text-3xl" />
      </Link>
    </div>
  );
}
