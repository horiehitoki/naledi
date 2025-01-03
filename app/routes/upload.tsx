import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Upload } from "lucide-react";
import Main from "~/components/layout/main";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getSessionAgent } from "~/lib/auth/session";
import { uploadBluemoji } from "~/lib/bluemoji/upload";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (agent == null) return redirect("/login");
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const agent = await getSessionAgent(request);
    if (!agent) return redirect("/login");

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const alt = formData.get("alt") as string;
    const file = formData.get("file") as File;

    if (!name?.trim()) {
      return { error: "絵文字名を入力してください" };
    }

    if (!name.match(/:((?!.*--)[A-Za-z0-9-]{4,20}(?<!-)):/gim)) {
      return { error: "無効な絵文字名です" };
    }

    if (file.type !== "image/png") {
      return { error: "PNGファイルのみアップロード可能です" };
    }

    const arrayBuffer = await file.arrayBuffer();

    await uploadBluemoji({
      agent,
      emoji: arrayBuffer,
      alttext: alt,
      emojiName: name,
    });

    return { success: true };
  } catch (error) {
    console.error("Emoji upload error:", error);
    return { error: "アップロード中にエラーが発生しました" };
  }
};

export default function UploadEmoji() {
  return (
    <Main>
      <Form
        method="post"
        encType="multipart/form-data"
        action="/upload"
        className="p-6 space-y-6"
      >
        <h2 className="text-2xl text-center font-bold">
          カスタム絵文字をアップロード
        </h2>

        <div>
          <Label htmlFor="name">絵文字名</Label>
          <Input
            id="name"
            name="name"
            pattern="^:[a-zA-Z0-9_]+:$"
            title="絵文字名は :name: の形式である必要があります。"
            required
          />
        </div>

        <div>
          <Label htmlFor="alt">Alt</Label>
          <Input id="alt" name="alt" required />
        </div>

        <div>
          <Label htmlFor="file">画像ファイル</Label>
          <div className="p-4 border border-dashed border-gray-600 rounded text-center">
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <div className="mt-2 text-gray-400">
              <Label className="text-green-500 hover:text-green-400 cursor-pointer">
                <span>ファイルを選択</span>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/png"
                  required
                  className="hidden"
                />
              </Label>
              <p className="mt-2 text-sm">PNG</p>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
        >
          アップロード
        </Button>
      </Form>
    </Main>
  );
}
