import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Loader2, UploadIcon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";
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

    const matches = name.match(/:((?!.*--)[A-Za-z0-9-]{4,20}(?<!-)):/);

    if (!matches || matches[0] !== name) {
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

    return { message: "絵文字のアップロードに成功しました。" };
  } catch (error) {
    console.error("Emoji upload error:", error);
    return { error: "アップロード中にエラーが発生しました" };
  }
};

export default function UploadEmoji() {
  const { toast } = useToast();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.message) {
      toast({
        title: actionData.message,
      });
    }

    if (actionData?.error) {
      toast({
        title: "Error",
        description: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData, toast]);

  return (
    <div>
      <Form
        method="post"
        encType="multipart/form-data"
        action="/emoji/upload"
        className="p-6 space-y-6"
      >
        <h2 className="text-2xl text-center font-bold">
          Bluemojiをアップロード
        </h2>

        <div>
          <Label htmlFor="name">絵文字名</Label>
          <Input
            id="name"
            name="name"
            pattern=":((?!.*--)[A-Za-z0-9-]{4,20}(?<!-)):"
            title="絵文字名は :name: の形式である必要があります。"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="alt">Alt</Label>
          <Input id="alt" name="alt" required disabled={isLoading} />
        </div>

        <div>
          <Label htmlFor="file">画像ファイル</Label>

          <Input
            id="file"
            name="file"
            type="file"
            accept="image/png"
            required
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              アップロード中....
            </>
          ) : (
            <>
              <UploadIcon className="mr-2 h-4 w-4" />
              アップロード
            </>
          )}
        </Button>
      </Form>
    </div>
  );
}
