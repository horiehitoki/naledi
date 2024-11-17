import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import { client } from "~/utils/auth/client";
import { Form } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { LogIn } from "lucide-react";
import { getSessionAgent } from "~/utils/auth/session";
import { Agent } from "@atproto/api";

//ログイン状態のチェック
export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent) return redirect("/home");

  return null;
};

//ログイン処理
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const handle = formData.get("handle");

  if (typeof handle === "string") {
    const url = await client.authorize(handle, {
      scope: "atproto transition:generic",
    });

    return redirect(url.toString());
  }

  return null;
};

export default function Index() {
  return (
    <div className="min-h-screen flex justify-start items-center md:px-36">
      <Card className="w-96 rounded-lg shadow-lg">
        <CardContent className="p-6 space-y-8">
          <h1 className="text-2xl font-bold">Stellar</h1>
          <h1>
            Stellarは、絵文字リアクションを行うことができる
            <br />
            AT ProtocolのWebクライアントです。
          </h1>

          <h1 className="text-2xl font-bold">ログイン</h1>

          <Form method="post">
            <div>
              <Input
                type="text"
                name="handle"
                id="handle"
                placeholder="Enter your handle"
                className="w-full p-2 rounded"
                required
              />
            </div>
            <Button type="submit" className="my-8 w-full font-semibold rounded">
              <LogIn />
              Login
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
