import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createClient } from "~/lib/auth/client";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { LogIn, Loader2, Sparkles, MessageSquare, Users } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export const action = async ({ request }: ActionFunctionArgs) => {
  const client = await createClient();
  const formData = await request.formData();
  const handle = formData.get("handle")?.toString().trim();

  if (!handle) {
    return { error: "ハンドルを入力してください" };
  }

  try {
    const url = await client.authorize(handle, {
      scope: "atproto transition:generic",
    });
    return redirect(url.toString());
  } catch (e) {
    console.error(e);
    return {
      error: "ログインに失敗しました。ハンドルが正しいかご確認ください。",
    };
  }
};

export default function Index() {
  const { toast } = useToast();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: "エラー",
        description: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData?.error, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 mb-12">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Stellar
            <Sparkles className="inline-block ml-3 text-yellow-400" />
          </h1>
          <p className="text-xl text-white/80 mb-8">
            絵文字リアクションで会話を彩る、AT Protocolウェブクライアント
          </p>
          <div className="space-y-6">
            <FeatureItem
              icon={<MessageSquare className="w-6 h-6" />}
              title="豊かな表現力"
              description="絵文字リアクションで、より直感的なコミュニケーションを実現"
            />
            <FeatureItem
              icon={<Users className="w-6 h-6" />}
              title="オープンなネットワーク"
              description="AT Protocolを使用した、分散した絵文字の管理"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/img/top.png"
            alt="Stellarアプリケーションのデモ画面"
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-gray-200/20 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2 text-white">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <Input
              type="text"
              name="handle"
              id="handle"
              placeholder="ハンドルを入力..."
              required
              disabled={isLoading}
              className="w-full px-4 py-2 bg-white/20 border-gray-200/30 rounded text-white placeholder-gray-400"
            />
            <Button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                  リダイレクト中...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4 inline" />
                  Login
                </>
              )}
            </Button>
          </Form>
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger>
                <h1 className="text-center pt-6 underline text-blue-500">
                  使用上の注意
                </h1>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>使用上の注意</DialogTitle>
                  <DialogDescription>
                    このサービスは、
                    <span>
                      <a
                        href="https://bsky.app/profile/maril445.bsky.social"
                        className="underline text-blue-500"
                      >
                        maril
                      </a>
                    </span>
                    が趣味で開発しているものです。運用コストなどの問題から、予告なくサービスを停止する可能性があります。{" "}
                    <br className="mb-4" />
                    だたし、ユーザーのPDSに保存されているデータは、サービスが停止しても削除されません。
                    <br className="mb-4" />
                    このサービスを利用するうえで生じた不利益について、開発者は一切の責任を負いません。
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 hover:bg-white/20">
      <div className="bg-white/20 p-2 rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
