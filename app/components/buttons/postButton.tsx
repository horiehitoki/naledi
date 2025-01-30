import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";
import EmojiAutocompleteInput from "../emoji/emojiAutoComplete";

export default function PostButton() {
  const [postOpen, setPostOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (isSubmitting) return;

    setPostOpen(false);
    setIsSubmitting(true);

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const content = formData.get("content");

    try {
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
        window.location.reload();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Dialog open={postOpen} onOpenChange={setPostOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">投稿する</DialogTitle>
          </DialogHeader>
          <form method="post" onSubmit={handleSubmit}>
            <EmojiAutocompleteInput />
            <Button type="submit" className="my-12" disabled={isSubmitting}>
              {isSubmitting ? "投稿中..." : "投稿"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <button
        onClick={() => setPostOpen(!postOpen)}
        className="md:flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg cursor-pointer hidden"
      >
        <PlusIcon className="w-6 h-6" />
        <span className="text-lg font-medium">投稿する</span>
      </button>
      <button
        className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground md:hidden"
        onClick={() => setPostOpen(!postOpen)}
      >
        <PlusIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
