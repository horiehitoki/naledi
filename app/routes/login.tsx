import { redirect } from "@remix-run/node";
import { client } from "~/utils/auth/client";

import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

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

export default function Login() {
  return (
    <div className="m-auto md:w-1/2 w-3/4 py-14">
      <h1 className="text-4xl font-bold text-center py-10">
        Atmosphereにログイン
      </h1>

      <Form method="post" className="py-10">
        <div>
          <label htmlFor="title">handle</label>
          <Input type="handle" name="handle" id="handle" required />
        </div>
        <Button type="submit" className="my-5">
          Login
        </Button>
      </Form>
    </div>
  );
}
