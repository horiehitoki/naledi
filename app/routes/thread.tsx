import {
  isRouteErrorResponse,
  useRouteError,
  useSearchParams,
} from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import Main from "~/components/layout/main";
import Post from "~/components/timeline/post";
import NotFound from "~/components/ui/404";
import Alert from "~/components/ui/alert";

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
        <h1>loading...</h1>
      </Main>
    );
  }

  if (isError) {
    return <Alert message="スレッドを取得中にエラーが発生しました。" />;
  }

  return (
    <Main>
      <Post post={data.post} reactions={data.post.reactions} />

      {data.replies.map((reply: any) => (
        <Post
          key={reply.post.uri}
          post={reply.post}
          reactions={reply.reactions}
        />
      ))}
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
