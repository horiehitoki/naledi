import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
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
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        <div className="lg:w-1/2 text-white">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
            Stellar
            <Sparkles className="inline-block ml-2 text-yellow-300" />
          </h1>
          <p className="text-xl mb-8 animate-fade-in-up animation-delay-200">
            絵文字リアクションで会話を彩る、次世代のAT
            Protocolウェブクライアント
          </p>
          <div className="space-y-4 animate-fade-in-up animation-delay-400">
            <FeatureItem
              icon={<MessageSquare className="w-6 h-6 text-blue-300" />}
              title="豊かな表現力"
              description="絵文字リアクションで、より直感的なコミュニケーションを実現"
            />
            <FeatureItem
              icon={<Users className="w-6 h-6 text-green-300" />}
              title="オープンなネットワーク"
              description="AT Protocolの特徴を活かした、分散型のソーシャルネットワーク"
            />
          </div>
        </div>
        <Card className="w-full max-w-md lg:w-1/2 backdrop-blur-lg bg-white/10 border-none animate-fade-in-up animation-delay-600">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold py-4 text-center text-white">
              ログイン
            </CardTitle>
            <CardDescription className="text-center text-gray-200">
              あなたのAT Protocolハンドルを入力してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  name="handle"
                  id="handle"
                  placeholder="ハンドルを入力..."
                  required
                  disabled={isLoading}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-300"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
                size="lg"
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
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}
