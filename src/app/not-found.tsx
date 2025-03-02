"use client";

import Button from "@/components/actions/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiSparkles } from "react-icons/hi";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex h-[100svh] flex-col items-center justify-center p-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 group">
          <h1 className="font-bold text-3xl flex">
            <span className="bg-gradient-to-r from-blue-800 to-indigo-900 inline-block text-transparent bg-clip-text">
              Stellar
            </span>

            <HiSparkles className="text-yellow-400 ml-2" />
          </h1>
        </div>
      </div>
      <h1 className="mt-2 text-center text-lg sm:text-xl text-skin-base">
        The page you are looking for could not be found
      </h1>
      <div className="mt-6 flex justify-center">
        <Button onClick={() => router.push("/dashboard/home")}>Go Home</Button>
      </div>
    </main>
  );
}
