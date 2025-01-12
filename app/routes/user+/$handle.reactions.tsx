import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import EmojiRender from "~/components/render/emojiRender";
import Post from "~/components/timeline/post";
import { resolveHandleOrDid } from "~/lib/actor/resolveHandleOrDid";
import { getSessionAgent } from "~/lib/auth/session";
import { prisma } from "~/lib/db/prisma";

export const loader: LoaderFunction = async ({ request, params }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return new Response(null, { status: 401 });

  const { handle } = params;
  if (!handle) return new Response(null, { status: 404 });

  const { did, error } = await resolveHandleOrDid(handle, agent);

  if (error) {
    return { error };
  }

  const data = await prisma.reaction.findMany({
    where: { authorDid: did! },
  });

  const reactions = [];
  for (const reaction of data) {
    const record = await agent.app.bsky.feed.getPosts({
      uris: [reaction.post_uri],
    });

    reactions.push({
      ...record.data.posts[0],
      emoji: JSON.parse(reaction.emoji),
      emojiRef: JSON.parse(reaction.record),
    });
  }

  return { reactions };
};

export default function Reactions() {
  const { reactions } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-4">
      {reactions.map((post: any) => {
        return (
          <div key={post.cid}>
            <EmojiRender
              cid={post.emoji.formats.png_128.ref.$link}
              repo={post.emojiRef.emoji.repo}
              name={post.emoji.name}
            />
            <div className="py-4">
              <Post post={post} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
