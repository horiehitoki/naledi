import { type ActionFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { render } from "~/lib/bluemoji/render";

export const action: ActionFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);

  if (!agent) {
    return new Response(null, { status: 401 });
  }

  try {
    const { record } = await request.json();

    if (record.facets) {
      const [bluemojiFacet] = record.facets;
      const [facet] = bluemojiFacet.features;

      const element = await render(agent, facet);

      console.log(element);
      return { element };
    }

    return null;
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
};
