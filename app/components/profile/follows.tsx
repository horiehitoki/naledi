import InfiniteScroll from "react-infinite-scroll-component";
import { useFollow } from "~/hooks/useFollow";
import { UserCard } from "./userCard";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

export default function Follows({ did }: { did: string }) {
  const { data, fetchNextPage, hasNextPage } = useFollow(did);
  const follows = data?.pages.flatMap((page) => page.follows) ?? [];

  return (
    <div>
      <InfiniteScroll
        dataLength={follows.length}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div>loading...</div>}
      >
        <div>
          {follows.map((follow: ProfileView) => {
            return <UserCard key={follow.did} data={follow} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
