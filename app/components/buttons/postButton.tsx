import { Form } from "@remix-run/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";
import { Toaster } from "../ui/toaster";

export default function PostButton() {
  const [postOpen, setPostOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const content = formData.get("content");

    const res = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: content }),
    });

    const json = await res.json();
    if (json.error) {
      toast({
        title: "Error",
        description: json.error,
        variant: "destructive",
      });
    }

    if (json.uri) {
      toast({
        title: "ポストが投稿されました！",
      });
    }

    setPostOpen(false);
  };

  return (
    <div>
      <Toaster />

      <Dialog open={postOpen} onOpenChange={setPostOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">投稿する</DialogTitle>
          </DialogHeader>

          <Form method="post" onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Textarea name="content" id="content" className="w-80 h-64" />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">投稿</Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>

      <button
        onClick={() => {
          setPostOpen(!postOpen);
        }}
        className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg cursor-pointer"
      >
        <PlusIcon className="w-6 h-6" />
        <span className="text-lg font-medium">投稿する</span>
      </button>
    </div>
  );
}
