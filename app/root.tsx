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
import { LinksFunction, LoaderFunction } from "@remix-run/node";
import NotFound from "./components/ui/404";
import ErrorPage from "./components/ui/errorPage";
import clsx from "clsx";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { themeSessionResolver } from "./sessions.server";
import { getSessionAgent } from "./utils/auth/session";
import { getUserProfile } from "./utils/user/getUserProfile";
import { Agent } from "@atproto/api";
import { RecoilRoot, useRecoilState } from "recoil";
import { sessionState } from "~/state/session";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: fontstyle },
];

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);
  const agent: Agent | null = await getSessionAgent(request);

  if (agent) {
    const { profile } = await getUserProfile(agent, agent.assertDid);

    return { theme: getTheme(), profile };
  }
  return { theme: getTheme() };
};

//テーマの設定
export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <RecoilRoot>
      <ThemeProvider
        specifiedTheme={data?.theme}
        themeAction="/action/set-theme"
      >
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  const [, setSession] = useRecoilState(sessionState);
  setSession(data.profile);

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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="jp">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {isRouteErrorResponse(error) ? (
          error.status === 404 ? (
            <NotFound />
          ) : (
            <ErrorPage />
          )
        ) : (
          <ErrorPage />
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
