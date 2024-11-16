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
import Picker from "emoji-picker-react";
import { useState } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: fontstyle },
];

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);

  return { theme: getTheme() };
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

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [postId, setPostId] = useState("");

  //@ts-ignore
  const handleEmojiClick = (event) => {
    setSelectedEmoji(event.emoji);

    console.log(postId, selectedEmoji);

    setIsEmojiPickerOpen(false);
  };

  const toggleEmojiPicker = (postId: string) => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
    setPostId(postId);
  };

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
        <Outlet
          context={{
            toggleEmojiPicker: toggleEmojiPicker,
          }}
        />

        {isEmojiPickerOpen && (
          <div className="absolute top-20 left-20 z-50">
            <Picker onEmojiClick={handleEmojiClick} lazyLoadEmojis={true} />
          </div>
        )}

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
          <div></div>
        )}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
