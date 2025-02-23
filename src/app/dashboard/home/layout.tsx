import MainLayout from "@/containers/dashboard/DashboardLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
