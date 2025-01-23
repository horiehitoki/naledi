import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createClient } from "~/lib/auth/client";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { LogIn, Loader2, Sparkles, MessageSquare, Users } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { useEffect } from "react";

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
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br animate-gradient-xy"></div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold mb-6 animate-fade-in-up">
            Stellar
            <Sparkles className="inline-block ml-3 text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-xl mb-8 animate-fade-in-up animation-delay-200 font-light">
            絵文字リアクションで会話を彩る、AT Protocolウェブクライアント
          </p>
          <div className="space-y-6 animate-fade-in-up animation-delay-400">
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

        <div className="lg:w-1/2 flex flex-col items-center">
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-gray-200/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">
                ログイン
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
                  className="bg-white/20 border-gray-200/30 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  aria-label="AT Protocolハンドル"
                />
                <Button
                  type="submit"
                  className="w-full rounded-md transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      リダイレクト中...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      ログイン
                    </>
                  )}
                </Button>
              </Form>
            </CardContent>
          </Card>
          <div className="mt-8 w-full">
            <img
              src="/img/top.png"
              alt="Stellarアプリケーションのデモ画面"
              className="rounded-xl shadow-2xl border-4 border-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40"
            />
          </div>
        </div>
      </div>
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
