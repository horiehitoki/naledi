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

interface PostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

function PostDialog({ open, onOpenChange, onSubmit }: PostDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">投稿する</DialogTitle>
        </DialogHeader>
        <Form method="post">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Textarea name="content" id="content" className="w-80 h-64" />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" onClick={onSubmit}>
              投稿
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function PostButton() {
  const [postOpen, setPostOpen] = useState(false);

  return (
    <div>
      <PostDialog
        open={postOpen}
        onOpenChange={setPostOpen}
        onSubmit={() => {}}
      />
      <button
        onClick={() => {
          setPostOpen(!postOpen);
        }}
        className="flex space-x-4"
      >
        <PlusIcon className="w-6 h-6" />
        <span className="text-lg font-medium">投稿する</span>
      </button>
    </div>
  );
}
