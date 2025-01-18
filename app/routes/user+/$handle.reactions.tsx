import { useLoaderData } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import EmojiRender from "~/components/render/emojiRender";
import Post from "~/components/timeline/post";
import { ActorReaction } from "~/generated/api/types/blue/maril/stellar/getActorReactions";
import { ReactionXrpc } from "~/lib/reaction/reactionXrpc";
import Loading from "~/components/ui/loading";
import { LoaderFunction, redirect } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { resolveHandleOrDid } from "~/lib/actor/resolveHandleOrDid";

export const loader: LoaderFunction = async ({ request, params }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return redirect("/login");

  const { handle } = params;
  if (!handle) return new Response(null, { status: 404 });

  const { did, error } = await resolveHandleOrDid(handle, agent);

  return { did, error };
};

export default function Reactions() {
  const { did } = useLoaderData<typeof loader>();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["actorReactions"],
    queryFn: async ({ pageParam }) => {
      const xrpc = new ReactionXrpc();
      const reactions = await xrpc.getActorReaction(did, 50, pageParam);

      return reactions.data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  const posts = data?.pages.flatMap((page) => page.feed) ?? [];

  if (isLoading) {
    return <Loading />;
  }

  if (posts.length === 0) {
    return <h1>リアクションが見つかりませんでした。</h1>;
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={<Loading />}
    >
      <div className="space-y-4">
        {posts.map((post: ActorReaction) => (
          <div key={post.post.cid}>
            <div className="py-4">
              <EmojiRender
                cid={post.reaction!.emoji.formats.png_128!.ref.$link}
                repo={post.reaction!.emojiRef!.repo}
                name={post.reaction!.emoji.name}
              />
            </div>
            <Post post={post.post} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
