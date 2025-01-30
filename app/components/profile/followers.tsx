import InfiniteScroll from "react-infinite-scroll-component";
import { useFollower } from "~/hooks/useFollow";
import { UserCard } from "./userCard";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Loading from "../ui/loading";

export default function Followers({ did }: { did: string }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useFollower(did);
  const followers = data
    ? data.pages.flatMap((page) => page.followers ?? [])
    : [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1 className="text-center">ユーザー情報の取得に失敗しました。</h1>;
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={followers.length}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Loading />}
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
