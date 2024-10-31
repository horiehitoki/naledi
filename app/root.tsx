import {
  Form,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { AppSidebar } from "~/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { getSessionAgent } from "~/utils/session";
import { Agent } from "@atproto/api";
import { LoaderFunction } from "@remix-run/node";
import * as Profile from "~/lexicon/types/app/bsky/actor/profile";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { redirect } from "@remix-run/node";
import { client } from "~/utils/auth/client";
import type { ActionFunctionArgs } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);

  if (!agent) return null;

  //profileの取得
  const { data: profileRecord } = await agent.com.atproto.repo.getRecord({
    repo: agent.assertDid,
    collection: "app.bsky.actor.profile",
    rkey: "self",
  });

  const profile =
    Profile.isRecord(profileRecord.value) &&
    Profile.validateRecord(profileRecord.value).success
      ? profileRecord.value
      : {};

  //CIDからアイコンデータを取得
  let avatarUrl = null;

  if (profile.avatar) {
    const icon = await agent.com.atproto.sync.getBlob({
      did: agent.assertDid,
      cid: profile.avatar.ref,
    });

    //base64に変換
    const buffer = Buffer.from(icon.data);
    avatarUrl = `data:${icon.headers["content-type"]};base64,${buffer.toString(
      "base64"
    )}`;
  }

  return { profile, avatarUrl };
};

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

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData();

  if (data) {
    const profile = data.profile;
    const avatarUrl = data.avatarUrl;

    return (
      <html lang="jp">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <SidebarProvider>
            <AppSidebar profile={profile} avatarUrl={avatarUrl} />
            <SidebarTrigger />
            {children}
            <ScrollRestoration />
            <Scripts />
          </SidebarProvider>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="jp">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
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
                ログイン
              </Button>
            </Form>
          </div>
        </body>
      </html>
    );
  }
}

export default function App() {
  const ctx = useLoaderData();

  return <Outlet context={ctx} />;
}
