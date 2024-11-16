import { SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ClientOnly } from "remix-utils/client-only";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { TimelineStorage } from "@types";

function AddTimelineContent({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [timelineType, setTimelineType] = useState<"home" | "user">("home");
  const [userDid, setUserDid] = useState("");
  const [savedTimeline, setSavedTimeline] = useLocalStorage<TimelineStorage[]>(
    "timeline",
    []
  );

  const handleAddTimeline = () => {
    const newTimeline: TimelineStorage = {
      id: uuidv4(),
      type: timelineType,
      did: timelineType === "user" ? userDid : null,
    };

    setSavedTimeline((prev) => [...prev, newTimeline]);
    setOpen(false);
    setTimelineType("home");
    setUserDid("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            タイムライン追加
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <RadioGroup
            defaultValue="home"
            value={timelineType}
            onValueChange={(value) => setTimelineType(value as "home" | "user")}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="home" id="home" />
              <Label htmlFor="home">ホームタイムライン</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="user" id="user" />
              <Label htmlFor="user">ユーザータイムライン</Label>
            </div>
          </RadioGroup>

          {timelineType === "user" && (
            <div className="grid gap-2">
              <Label htmlFor="did">ユーザーDID</Label>
              <Input
                id="did"
                value={userDid}
                onChange={(e) => setUserDid(e.target.value)}
                placeholder="did:plc:xxxxx"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleAddTimeline}
            disabled={timelineType === "user" && !userDid}
          >
            追加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

//client only
export default function AddTimeline({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <ClientOnly fallback={<div></div>}>
      {() => <AddTimelineContent open={open} setOpen={setOpen} />}
    </ClientOnly>
  );
}
