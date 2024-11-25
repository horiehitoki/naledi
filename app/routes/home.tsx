import { Agent } from "@atproto/api";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";
import { getSessionAgent } from "~/utils/auth/session";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/ui/app-sidebar";
import Picker from "emoji-picker-react";
import { useEmojiPicker } from "~/hooks/useEmojiPicker";
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
  //絵文字ピッカーのSetup
  const {
    isEmojiPickerOpen,
    emojiPicker,
    toggleEmojiPicker,
    handleEmojiClick,
  } = useEmojiPicker();

  //レスポンシブ設定
  return (
    <div>
      {isEmojiPickerOpen && (
        <div
          style={{
            position: "absolute",
            top: `${emojiPicker.position.top}px`,
            left: `${emojiPicker.position.left}px`,
            zIndex: 50,
          }}
        >
          <Picker onEmojiClick={handleEmojiClick} lazyLoadEmojis={false} />
        </div>
      )}

      <div className="md:block hidden">
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />

          <Outlet context={toggleEmojiPicker} />
        </SidebarProvider>
      </div>

      <div className="md:hidden block">
        <Outlet context={toggleEmojiPicker} />
        <FooterMenu />
      </div>
    </div>
  );
}
