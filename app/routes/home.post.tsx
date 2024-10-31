import { Agent } from "@atproto/api";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { getSessionAgent } from "~/utils/session";
import { useToast } from "~/hooks/use-toast";
import { Toaster } from "~/components/ui/toaster";
import { useState } from "react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (!agent) return;

  const formData = await request.formData();
  const content = formData.get("content");

  if (typeof content === "string") {
    await agent.post({
      text: content,
      createdAt: new Date().toISOString(),
    });
  }

  return null;
};

export default function Post() {
  const { toast } = useToast();
  const [open, SetOpen] = useState(true);

  return (
    <div>
      <Toaster />
      <Dialog open={open} onOpenChange={SetOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-blod text-2xl">投稿する</DialogTitle>
          </DialogHeader>
          <Form method="post">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Textarea name="content" id="content" className="w-80 h-64" />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  SetOpen(!open);
                  toast({
                    title: "投稿完了✅",
                    description: "ポストが投稿されました",
                  });
                }}
              >
                投稿
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
