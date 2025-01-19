import { useOutletContext } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import EmojiRender from "~/components/render/emojiRender";
import Post from "~/components/timeline/post";
import { ActorReaction } from "~/generated/api/types/blue/maril/stellar/getActorReactions";
import Loading from "~/components/ui/loading";

export default function Reactions() {
  const { did } = useOutletContext<{ did: string; error: string }>();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["actorReactions"],
    queryFn: async ({ pageParam }) => {
      let endpoint;

      if (pageParam) {
        endpoint = `/api/actorReaction?cursor=${pageParam}&did=${did}`;
      } else {
        endpoint = `/api/actorReaction?did=${did}`;
      }

      const res = await fetch(endpoint);

      const reactions = await res.json();

      return reactions;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  const posts = data?.pages.flatMap((page) => page.feed) ?? [];

  if (isLoading) {
    return <Loading />;
  }

  if (posts.length === 0) {
    return (
      <h1 className="text-center">リアクションが見つかりませんでした。</h1>
    );
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
