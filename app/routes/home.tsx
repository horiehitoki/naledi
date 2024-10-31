import { Outlet, useOutletContext } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function Homepage() {
  const data = useOutletContext();

  if (data) {
    return (
      <div className="m-auto md:w-1/2 w-3/4 py-14">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="m-auto md:w-1/2 w-3/4 py-14">
      <h1 className="text-4xl font-bold text-center py-10">
        ログインしてください!
      </h1>

      <a href="/login" className="my-5 flex justify-center">
        <Button>ログイン</Button>
      </a>
    </div>
  );
}
