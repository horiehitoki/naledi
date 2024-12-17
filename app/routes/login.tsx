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
import { LogIn, Loader2 } from "lucide-react";
import { Toaster } from "~/components/ui/toaster";
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
        title: "Error",
        description: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData?.error, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Toaster />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold py-4 text-center">
            Stellar
          </CardTitle>
          <CardDescription className="text-center">
            絵文字リアクションができるAT ProtocolのWebクライアント
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
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  リダイレクト中....
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
  );
}
