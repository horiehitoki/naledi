"use client";

import Navbar from "../navbar/Navbar";
import Image from "next/image";
import Button from "@/components/actions/button/Button";
import { HiSparkles } from "react-icons/hi";

export default function SidePanel() {
  return (
    <menu className="hidden md:inline-flex items-center lg:items-start flex-col sticky top-6 h-full max-h-[91svh] overflow-y-hidden hover:overflow-y-auto">
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline mb-8"
      >
        <div className="flex items-center gap-3 group">
          <h1 className="font-bold text-3xl flex">
            <span className="bg-gradient-to-r from-blue-800 to-indigo-900 inline-block text-transparent bg-clip-text">
              Stellar
            </span>

            <HiSparkles className="text-yellow-400 ml-2" />
          </h1>
        </div>
      </Button>
      <Navbar />
    </menu>
  );
}
