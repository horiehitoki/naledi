import { Agent } from "@atproto/api";
import type { ActionFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { BluemojiRichText } from "~/lib/bluemoji/facet/BluemojiRichText";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null)
    return new Response(JSON.stringify({ error: "認証が必要です" }), {
      status: 401,
    });

  switch (request.method) {
    case "POST": {
      const body = await request.json();

      const rt = new BluemojiRichText({
        text: body.text,
      });

      try {
        await rt.detectFacets(agent);
      } catch (e) {
        console.log(e);

        return new Response(
          JSON.stringify({ error: "絵文字が見つかりませんでした。" }),
          {
            status: 500,
          }
        );
      }

      try {
        const postRecord = {
          $type: "app.bsky.feed.post",
          text: rt.text,
          facets: rt.facets,
          createdAt: new Date().toISOString(),
          via: "Stellar",
        };

        const post = await agent.post(postRecord);

        return Response.json({ uri: post.uri });
      } catch (e) {
        console.log(e);

        return new Response(JSON.stringify({ error: "投稿に失敗しました。" }), {
          status: 500,
        });
      }
    }

    case "DELETE": {
      try {
        const body = await request.json();

        await agent.deletePost(body.postUri);

        return Response.json({ ok: true });
      } catch (e) {
        console.log(e);

        return new Response(
          JSON.stringify({ error: "投稿の削除に失敗しました。" }),
          {
            status: 500,
          }
        );
      }
    }
  }
};
