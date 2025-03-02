import type { Metadata } from "next";
import { getProfile } from "@/lib/api/bsky/actor";
import { getSessionFromServer } from "@/lib/api/auth/session";
import { AgentProvider } from "../providers/agent";
import { EmojiPickerProvider } from "../providers/BluemojiPickerProvider";
import BluemojiPicker from "@/components/actions/bluemoji/BluemojiPicker";
import MainContainer from "@/containers/main/MainContainer";

export const metadata: Metadata = {
  title: { template: "%s — Stellar", default: "Stellar" },
  description: "Home",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.bskySession.handle);

  return (
    <AgentProvider session={session}>
      <EmojiPickerProvider>
        <BluemojiPicker />
        <MainContainer profile={profile}>{children}</MainContainer>
      </EmojiPickerProvider>
    </AgentProvider>
  );
}
