import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "~/components/timeline/post";
import Loading from "~/components/ui/loading";
import { FeedViewPostWithReaction } from "~/components/timeline/timeline";
import Main from "~/components/layout/main";
import { HomeIcon, Smile } from "lucide-react";
import UriTabs from "~/components/ui/uriTabs";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import NotFound from "~/components/ui/404";
import Alert from "~/components/ui/alert";

export default function Reactions() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["reactedPosts"],
      queryFn: async ({ pageParam }) => {
        let endpoint;

        if (pageParam) {
          endpoint = `/api/getReactedPosts?cursor=${pageParam}`;
        } else {
          endpoint = `/api/getReactedPosts`;
        }

        const res = await fetch(endpoint);

        const reactions = await res.json();

        return reactions;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.cursor,
    });

  const posts = data ? data.pages.flatMap((page) => page.feed ?? []) : [];

  const tabs = [
    {
      path: "/",
      label: "ホーム",
      icon: HomeIcon,
    },
    {
      path: "/reactedPosts",
      label: "リアクション付き",
      icon: Smile,
    },
  ];

  if (isLoading) {
    return (
      <Main>
        <UriTabs tabs={tabs} />

        <Loading />
      </Main>
    );
  }

  if (isError) {
    return (
      <Main>
        <UriTabs tabs={tabs} />

        <h1 className="text-center">
          リアクションを取得中にエラーが発生しました。
        </h1>
      </Main>
    );
  }

  if (posts.length === 0) {
    return (
      <Main>
        <UriTabs tabs={tabs} />

        <h1 className="text-center">リアクションが見つかりませんでした。</h1>
      </Main>
    );
  }

  console.log(posts);

  return (
    <Main>
      <UriTabs tabs={tabs} />

      <InfiniteScroll
        dataLength={posts.length}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<Loading />}
      >
        <div>
          {posts.map((data: FeedViewPostWithReaction) => (
            <div key={data.post.cid}>
              <Post post={data.post} reactions={data.reactions} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </Main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      {isRouteErrorResponse(error) ? (
        error.status === 404 ? (
          <NotFound />
        ) : (
          <Alert message="リアクション一覧を取得中にエラーが発生しました。" />
        )
      ) : (
        <Alert message="リアクション一覧を取得中にエラーが発生しました。" />
      )}
    </div>
  );
}
