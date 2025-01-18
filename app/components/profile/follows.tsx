import InfiniteScroll from "react-infinite-scroll-component";
import { useFollow } from "~/hooks/useFollow";
import { UserCard } from "./userCard";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Alert from "../ui/alert";
import Loading from "../ui/loading";

export default function Follows({ did }: { did: string }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useFollow(did);
  const follows = data?.pages.flatMap((page) => page.follows) ?? [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Alert message="ユーザー情報の取得に失敗しました。" />;
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={follows.length}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Loading />}
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
