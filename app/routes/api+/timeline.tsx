import { Agent } from "@atproto/api";
import { json, LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { prisma } from "~/utils/db/prisma";
import { getParams } from "~/utils/getParams";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const cursor = getParams(request, "cursor");

  const did = getParams(request, "did");

  if (did) {
    //特定ユーザーの投稿を取得
    const timeline = await agent.getAuthorFeed({
      actor: did,
      cursor: cursor,
      limit: 20,
    });

    const data = await Promise.all(
      timeline.data.feed.map(async (post) => {
        const reaction = await prisma.reaction.findMany({
          where: {
            uri: post.post.uri,
          },
        });

        return { post, reaction };
      })
    );

    return json({
      data,
      cursor: timeline.data.cursor,
    });
  } else {
    //ホームタイムラインを取得
    const timeline = await agent.getTimeline({
      cursor: cursor,
      limit: 20,
    });

    const data = await Promise.all(
      timeline.data.feed.map(async (post) => {
        const reaction = await prisma.reaction.findMany({
          where: {
            uri: post.post.uri,
          },
        });

        return { post, reaction };
      })
    );

    return json({
      data,
      cursor: timeline.data.cursor,
    });
  }
};
