import { ReactNode } from "react";
import SideBar from "../ui/sidebar";
import FooterMenu from "../ui/mobileNavbar";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto p-4 md:flex">
      <div className="hidden md:block">
        <SideBar />
      </div>
      <div className="block md:hidden">
        <FooterMenu />
      </div>
      <div className="space-y-8 md:w-1/2 mx-auto">{children}</div>
    </div>
  );
}
