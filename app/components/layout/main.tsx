import { ReactNode } from "react";
import SideBar from "../ui/sidebar";
import FooterMenu from "../ui/mobileNavbar";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto p-4 md:flex md:w-1/2">
      <div className="hidden md:block md:w-40 shrink-0">
        <SideBar />
      </div>
      <div className="block md:hidden">
        <FooterMenu />
      </div>
      <div className="space-y-8 md:w-[40em] mx-auto">{children}</div>
    </div>
  );
}
