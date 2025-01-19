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
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./tailwind.css";
import { RecoilRoot } from "recoil";
import { getSessionAgent } from "./lib/auth/session";
import { useSetProfile } from "./state/profile";
import NotFound from "./components/ui/404";
import ErrorPage from "./components/ui/errorPage";
import EmojiPicker from "./components/emoji/emojiPicker";
import { prisma } from "./lib/db/prisma";
import { useSetEmojis } from "./state/emoji";
import { Toaster } from "./components/ui/toaster";
import { useUnreadNotifications } from "./hooks/useNotifications";
import { useSetUnread } from "./state/unread";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return null;

  const profile = await agent.getProfile({ actor: agent.assertDid });

  //カスタム絵文字をAppViewからすべて取得
  const emojis = await prisma.emoji.findMany({
    where: { repo: agent.assertDid },
  });

  return { profile, agent, emojis };
};

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <html lang="jp" className="dark">
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
          </head>
          <body>
            <Toaster />
            <EmojiPicker />
            {children}
            <ScrollRestoration />
            <Scripts />
          </body>
        </html>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  //未読の通知を定期的にカウント
  const { data: unread } = useUnreadNotifications();

  const setUnread = useSetUnread();

  const setProfile = useSetProfile();
  const setEmojis = useSetEmojis();

  if (data?.profile) {
    setProfile(data?.profile?.data);
  }

  if (data?.emojis) {
    setEmojis(data?.emojis);
  }

  if (unread) {
    setUnread(unread.count);
  }

  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      {isRouteErrorResponse(error) ? (
        error.status === 404 ? (
          <NotFound />
        ) : (
          <ErrorPage />
        )
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}
