import { ReactNode } from "react";
import SideBar from "../ui/sidebar";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto p-4 flex">
      <SideBar />
      <div className="space-y-8 w-1/2 mx-auto">{children}</div>
    </div>
  );
}
