import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./tailwind.css";
import { RecoilRoot } from "recoil";
import { getSessionAgent } from "./lib/auth/session";
import { useSetProfile } from "./state/profile";

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

  return { profile };
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
  const { profile } = useLoaderData<typeof loader>();

  const setProfile = useSetProfile();

  if (profile) {
    setProfile(profile.data);
  }

  return <Outlet />;
}
