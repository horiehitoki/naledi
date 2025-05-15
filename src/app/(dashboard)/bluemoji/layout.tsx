import Layout from "@/containers/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s - Naledi", default: "Bluemoji" },
  description: "Bluemoji",
};

export default function BluemojiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
