import { useOutletContext } from "@remix-run/react";
import Timeline from "~/components/timeline/timeline";

export default function Posts() {
  const { did } = useOutletContext<{ did: string; error: string }>();

  return (
    <div>
      <Timeline type="user" did={did} />
    </div>
  );
}
