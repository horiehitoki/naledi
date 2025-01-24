import { LoaderFunction, redirect } from "@remix-run/node";
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
import { getSessionAgent } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (agent == null) return redirect("/login");

  return null;
};

const PostWithReplies = ({
  post,
  level = 0,
}: {
  post: any;
  level?: number;
}) => {
  return (
    <div style={{ marginLeft: level > 0 ? `${level * 16}px` : 0 }}>
      <Post post={post.post} reactions={post.reactions} reply={post.reply} />
      {post.replies?.map((reply: FeedViewPostWithReaction) => (
        <PostWithReplies key={reply.post.uri} post={reply} level={level + 1} />
      ))}
    </div>
  );
};

export default function Threads() {
  const [searchParams] = useSearchParams();
  const uri = searchParams.get("uri");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["thread", uri],
    queryFn: async () => {
      const res = await fetch(`/api/threads?uri=${encodeURIComponent(uri!)}`);
      return res.json();
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
    return (
      <Main>
        <h1 className="text-center">
          スレッドを取得中にエラーが発生しました。
        </h1>
      </Main>
    );
  }

  return (
    <Main>
      {data.parents?.map((parent: FeedViewPostWithReaction) => (
        <Post
          key={parent.post.uri}
          post={parent.post}
          reactions={parent.reactions}
        />
      ))}
      <Post post={data.post.post} reactions={data.post.reactions} />
      {data.replies?.map((reply: FeedViewPostWithReaction) => (
        <PostWithReplies key={reply.post.uri} post={reply} />
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
