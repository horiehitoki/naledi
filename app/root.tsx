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
import clsx from "clsx";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { themeSessionResolver } from "./sessions.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: fontstyle },
];

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);

  if (!agent) return null;
  const { profile, avatarUrl } = await getUserProfile(agent, agent.assertDid);
  const { getTheme } = await themeSessionResolver(request);

  return { profile, avatarUrl, theme: getTheme() };
};

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data?.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html lang="jp" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {data && <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />}
      </head>
      <body>
        <SidebarProvider>
          {data && (
            <AppSidebar profile={data.profile} avatarUrl={data.avatarUrl} />
          )}
          <SidebarTrigger />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </SidebarProvider>
      </body>
    </html>
  );
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
