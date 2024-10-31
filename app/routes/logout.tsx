import { getIronSession } from "iron-session";
import { Session } from "@types";
import { redirect } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();

  //セッションを削除
  const session = await getIronSession<Session>(request, response, {
    cookieName: "sid",
    password: process.env.SESSION_SECRET!,
  });
  await session.destroy();
  return redirect("/", { headers: response.headers });
};
