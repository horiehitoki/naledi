import { useOutletContext } from "@remix-run/react";
import Followers from "~/components/profile/followers";

export default function FollowerList() {
  const { did } = useOutletContext<{ did: string; error: string }>();

  return (
    <div>
      <Followers did={did} />
    </div>
  );
}
