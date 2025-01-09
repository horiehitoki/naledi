import InfiniteScroll from "react-infinite-scroll-component";
import { useFollower } from "~/hooks/useFollow";
import { UserCard } from "./userCard";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

export default function Followers({ did }: { did: string }) {
  const { data, fetchNextPage, hasNextPage } = useFollower(did);
  const followers = data?.pages.flatMap((page) => page.followers) ?? [];

  return (
    <div>
      <InfiniteScroll
        dataLength={followers.length}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div>loading...</div>}
      >
        <div>
          {followers.map((follower: ProfileView) => {
            return <UserCard key={follower.did} data={follower} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
