import { useOutletContext } from "@remix-run/react";
import Follows from "~/components/profile/follows";

export default function FollowList() {
  const { did } = useOutletContext<{ did: string; error: string }>();

  return (
    <div>
      <Follows did={did} />
    </div>
  );
}
