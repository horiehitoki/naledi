import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import EmojiRender from "~/components/render/emojiRender";
import Loading from "~/components/ui/loading";
import { Reaction } from "~/generated/api/types/blue/maril/stellar/getReactions";
import { useSearchParams } from "@remix-run/react";
import { UserCard } from "~/components/profile/userCard";
import Main from "~/components/layout/main";

export default function Reactions() {
  const [searchParams] = useSearchParams();
  const uri = searchParams.get("uri");
  const cid = searchParams.get("cid");

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["postReactions"],
      queryFn: async ({ pageParam }) => {
        let endpoint;

        if (pageParam) {
          endpoint = `/api/reaction?cursor=${pageParam}&uri=${uri}&cid=${cid}`;
        } else {
          endpoint = `/api/reaction?uri=${uri}&cid=${cid}`;
        }

        const res = await fetch(endpoint);

        const reactions = await res.json();

        return reactions;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.cursor,
    });

  const reactions = data?.pages.flatMap((page) => page.feed) ?? [];

  if (isLoading) {
    return (
      <Main>
        <Loading />
      </Main>
    );
  }

  if (isError) {
    return (
      <h1 className="text-center">
        リアクションを取得中にエラーが発生しました。
      </h1>
    );
  }

  if (reactions.length === 0) {
    return (
      <h1 className="text-center">リアクションが見つかりませんでした。</h1>
    );
  }

  return (
    <Main>
      <h1 className="text-2xl text-center font-bold py-6">
        この投稿にリアクションしたユーザー
      </h1>
      <InfiniteScroll
        dataLength={reactions.length}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<Loading />}
      >
        <div className="space-y-4">
          {reactions.map((data: Reaction) => (
            <div key={data.actor.did}>
              <EmojiRender
                repo={data.emojiRef!.repo}
                cid={data.emoji.formats.png_128!.ref.$link}
                name={data.emoji.name}
              />
              <UserCard data={data.actor} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </Main>
  );
}
