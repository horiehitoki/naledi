import {
  isRouteErrorResponse,
  useRouteError,
  useSearchParams,
} from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import Main from "~/components/layout/main";
import Post from "~/components/timeline/post";
import { FeedViewPostWithReaction } from "~/components/timeline/timeline";
import NotFound from "~/components/ui/404";
import Alert from "~/components/ui/alert";
import Loading from "~/components/ui/loading";

export default function Threads() {
  const [searchParams] = useSearchParams();
  const uri = searchParams.get("uri");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["thread"],
    queryFn: async () => {
      const res = await fetch(`/api/threads?uri=${encodeURIComponent(uri!)}`);

      const data = await res.json();

      return data;
    },
  });

  if (isLoading) {
    return (
      <Main>
        <Loading />
      </Main>
    );
  }

  if (isError) {
    return <Alert message="スレッドを取得中にエラーが発生しました。" />;
  }

  return (
    <Main>
      <Post
        post={data.post.post}
        reactions={data.post.reactions}
        reason={data.reason}
        reply={data.reply}
      />

      {data.replies.map((reply: FeedViewPostWithReaction) => {
        return (
          <Post
            key={reply.post.uri}
            post={reply.post}
            reply={reply.reply}
            reactions={reply.reactions}
          />
        );
      })}
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
          <Alert message="スレッドを取得中にエラーが発生しました。" />
        )
      ) : (
        <Alert message="スレッドを取得中にエラーが発生しました。" />
      )}
    </div>
  );
}
