"use client";
import FeedTabs from "@/components/navigational/feedTabs/FeedTabs";
import { useClientModeState } from "@/state/client";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = useClientModeState();

  return (
    <div>
      {mode === "Default" ? <FeedTabs /> : ""}
      {children}
    </div>
  );
}
