import { Outlet } from "@remix-run/react";

export default function Homepage() {
  return (
    <div className="m-auto md:w-1/2 w-3/4 py-14">
      <Outlet />
    </div>
  );
}
