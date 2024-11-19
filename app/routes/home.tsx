import { Agent } from "@atproto/api";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { Outlet, redirect, useOutletContext } from "@remix-run/react";
import { useState } from "react";

import { getSessionAgent } from "~/utils/auth/session";
import { useToast } from "~/hooks/use-toast";

import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/ui/app-sidebar";
import { Toaster } from "~/components/ui/toaster";
import { PostDialog } from "~/components/timeline/post-dialog";
import Picker from "emoji-picker-react";
import { useEmojiPicker } from "~/hooks/useEmojiPicker";
import { ProfileView } from "~/generated/api/types/app/bsky/actor/defs";
import FooterMenu from "~/components/ui/footer";

//ログイン状態のチェック
export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return redirect("/");

  return null;
};

//投稿処理
export const action = async ({ request }: ActionFunctionArgs) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (!agent) return;

  const formData = await request.formData();
  const content = formData.get("content");

  //投稿レコードの作成
  if (typeof content === "string") {
    const record = {
      $type: "app.bsky.feed.post",
      text: content,
      createdAt: new Date().toISOString(),
      via: "Stellar", //投稿元を含める
    };

    await agent.com.atproto.repo.createRecord({
      repo: agent.assertDid,
      collection: "app.bsky.feed.post",
      record: record,
    });
  }

  return redirect("/home");
};

export default function Homepage() {
  const context = useOutletContext<ProfileView>();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  //絵文字ピッカーのSetup
  const { isEmojiPickerOpen, position, handleEmojiClick, toggleEmojiPicker } =
    useEmojiPicker();

  //投稿完了時のtoast
  const handlePostSubmit = () => {
    setOpen(false);
    toast({
      title: "投稿完了✅",
      description: "ポストが投稿されました",
    });
  };

  //レスポンシブ設定
  return (
    <div>
      <div className="md:block hidden">
        <SidebarProvider>
          <AppSidebar profile={context} open={open} setOpen={setOpen} />
          <SidebarTrigger />

          <Outlet context={{ toggleEmojiPicker, profile: context }} />

          {isEmojiPickerOpen && (
            <div
              style={{
                position: "absolute",
                top: `${position.top}px`,
                left: `${position.left}px`,
                zIndex: 50,
              }}
            >
              <Picker onEmojiClick={handleEmojiClick} lazyLoadEmojis={false} />
            </div>
          )}

          <PostDialog
            open={open}
            onOpenChange={setOpen}
            onSubmit={handlePostSubmit}
          />

          <Toaster />
        </SidebarProvider>
      </div>

      <div className="md:hidden block">
        <Outlet context={{ toggleEmojiPicker, profile: context }} />

        {isEmojiPickerOpen && (
          <div
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
              zIndex: 50,
            }}
          >
            <Picker onEmojiClick={handleEmojiClick} lazyLoadEmojis={false} />
          </div>
        )}

        <PostDialog
          open={open}
          onOpenChange={setOpen}
          onSubmit={handlePostSubmit}
        />

        <Toaster />
        <FooterMenu profile={context} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
