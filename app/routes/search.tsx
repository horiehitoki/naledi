import { Agent } from "@atproto/api";
import { ActionFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import Main from "~/components/layout/main";
import { Input } from "~/components/ui/input";
import { getSessionAgent } from "~/lib/auth/session";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  const formData = await request.formData();
  const query = formData.get("query") as string;
  if (!query) return new Response(null, { status: 500 });

  const res = await agent.app.bsky.feed.searchPosts({
    q: query,
  });

  return res;
};

export default function Search() {
  const result = useActionData<typeof action>();

  console.log(result);

  return (
    <Main>
      <Form action="/search" method="post">
        <Input
          type="text"
          name="query"
          placeholder="キーワードを入力..."
          className="my-12"
        />
      </Form>
    </Main>
  );
}
