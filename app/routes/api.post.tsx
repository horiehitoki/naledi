import { Agent } from "@atproto/api";
import type { ActionFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { BluemojiRichText } from "~/lib/bluemoji/facet/BluemojiRichText";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  switch (request.method) {
    case "POST": {
      const body = await request.json();

      const rt = new BluemojiRichText({
        text: body.text,
      });

      await rt.detectFacets(agent);

      const postRecord = {
        $type: "app.bsky.feed.post",
        text: rt.text,
        facets: rt.facets,
        createdAt: new Date().toISOString(),
      };

      const post = await agent.post(postRecord);

      return { uri: post.uri };
    }

    case "DELETE": {
      const body = await request.json();

      await agent.deletePost(body.postUri);

      return { ok: true };
    }
  }
};
