import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Session } from "@types";
import { getIronSession } from "iron-session";
import { client } from "~/utils/auth/client";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const response = new Response();

  try {
    const { session } = await client.callback(params);
    const clientSession = await getIronSession<Session>(request, response, {
      cookieName: "sid",
      password: process.env.SESSION_SECRET!,
    });

    clientSession.did = session.did;
    await clientSession.save();

    return redirect("/", { headers: response.headers });
  } catch (error) {
    console.error("Error during session handling:", error);
    return null;
  }
}
