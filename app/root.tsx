import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css?url";
import fontstyle from "~/font.css?url";
import { AppSidebar } from "~/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { getSessionAgent } from "~/utils/auth/session";
import { Agent } from "@atproto/api";
import { LinksFunction, LoaderFunction } from "@remix-run/node";
import NotFound from "./components/ui/404";
import ErrorPage from "./components/ui/errorPage";
import { getUserProfile } from "./utils/user/getUserProfile";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: fontstyle },
];

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);

  if (!agent) return null;
  const { profile, avatarUrl } = await getUserProfile(agent, agent.assertDid);

  return { profile, avatarUrl };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  if (data)
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
            <AppSidebar profile={data.profile} avatarUrl={data.avatarUrl} />
            <SidebarTrigger />
            {children}
            <ScrollRestoration />
            <Scripts />
          </SidebarProvider>
        </body>
      </html>
    );

  return (
    <html lang="jp">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const ctx = useLoaderData<typeof loader>();

  return <Outlet context={ctx} />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <>
      <h1>
        {isRouteErrorResponse(error) ? (
          error.status === 404 ? (
            <NotFound />
          ) : (
            <ErrorPage />
          )
        ) : (
          <ErrorPage />
        )}
      </h1>
      <Scripts />
    </>
  );
}
