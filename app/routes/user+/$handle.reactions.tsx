import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import EmojiRender from "~/components/render/emojiRender";
import Post from "~/components/timeline/post";
import { resolveHandleOrDid } from "~/lib/actor/resolveHandleOrDid";
import { getSessionAgent } from "~/lib/auth/session";
import { prisma } from "~/lib/db/prisma";

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const agent = await getSessionAgent(request);
    if (!agent) return new Response(null, { status: 401 });

    const { handle } = params;
    if (!handle) return new Response(null, { status: 404 });

    const { did } = await resolveHandleOrDid(handle, agent);

    const reactionData = await prisma.reaction.findMany({
      where: { authorDid: did! },
      orderBy: { createdAt: "desc" },
    });

    const reactions = await Promise.all(
      reactionData.map(async (reaction) => {
        try {
          const record = await agent.app.bsky.feed.getPosts({
            uris: [reaction.post_uri],
          });

          if (!record.data.posts[0]) return null;

          return {
            ...record.data.posts[0],
            emoji: JSON.parse(reaction.emoji),
            emojiRef: JSON.parse(reaction.record),
          };
        } catch (e) {
          console.error(e);
          return null;
        }
      })
    );

    const validReactions = reactions.filter((r) => r !== null);

    return { reactions: validReactions };
  } catch (error) {
    return null;
  }
};

export default function Reactions() {
  const { reactions } = useLoaderData<typeof loader>();

  if (reactions.length === 0) {
    return <h1>No reactions found</h1>;
  }

  return (
    <div className="space-y-4">
      {reactions.map((post: any) => (
        <div key={post.cid}>
          <div className="py-4">
            <EmojiRender
              cid={post.emoji.formats.png_128.ref.$link}
              repo={post.emojiRef.emoji.repo}
              name={post.emoji.name}
            />
          </div>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}
