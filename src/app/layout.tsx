import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SessionProvider from "./providers/session";
import QueryProvider from "./providers/query";
import { ComposerProvider } from "./providers/composer";
import ToastProvider from "./providers/toast";
import { ScrollProvider } from "./providers/scroll";
import { getSessionFromServer } from "@/lib/api/auth/session";
import ThemeProvider from "./providers/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s - Naledi", default: "Naledi" },
  description: "AT Protocol web client with Bluemoji reactions",
  metadataBase: new URL("https://gunjo.org"),
  other: {
    "fc:frame": "vNext",
    "of:version": "vNext",
    "of:accepts:anonymous": "vNext",
    "of:image": "https://gunjo.org/images/ogp.png",
    "fc:frame:image": "https://gunjo.org/images/ogp.png",
    "fc:frame:button:1": "Home",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://gunjo.org/",
    "fc:frame:button:2": "About",
    "fc:frame:button:2:action": "link",
    "fc:frame:button:2:target": "https://gunjo.org/about",
    "fc:frame:button:3": "Website",
    "fc:frame:button:3:action": "link",
    "fc:frame:button:3:target": "https://foundation.gunjo.org",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromServer();

  return (
    <html lang="jp" className="bg-skin-base">
      <head>
        {/* for making the page fullscreen on iOS when added to home */}
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SessionProvider session={session}>
            <ScrollProvider>
              <QueryProvider>
                <ComposerProvider>{children}</ComposerProvider>
              </QueryProvider>
              <ToastProvider />
            </ScrollProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
