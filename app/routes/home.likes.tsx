import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserCard } from "~/components/user/userCard";
import { ProfileView } from "~/generated/api/types/app/bsky/actor/defs";
import { useLikes } from "~/hooks/useLikes";
import { getSessionAgent } from "~/utils/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return null;

  const { searchParams } = new URL(request.url);
  const uri = searchParams.get("uri");
  if (!uri) return null;

  const likes = await agent.getLikes({ uri: uri });

  return { initialLikes: likes.data, uri };
};

export default function Threads() {
  const { initialLikes, uri } = useLoaderData<typeof loader>();

  //無限スクロール用に初期化
  const { likes, fetcher, hasMore } = useLikes({
    uri: uri,
    initialLikes,
  });

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-12">
        いいねしたユーザー
      </h1>

      <InfiniteScroll
        dataLength={likes.length}
        next={() => fetcher()}
        hasMore={hasMore}
        loader={<div></div>}
      >
        <div className="space-y-8">
          {likes.map((like: { actor: ProfileView }) => {
            return <UserCard data={like.actor} key={like.actor.did}></UserCard>;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
