import { Reaction } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import Emoji from "@emoji-mart/react";

export default function ReactionButtons({
  reactions,
}: {
  reactions: Reaction[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {reactions.map((reaction) => (
        <TooltipProvider key={reaction.id}>
          <Tooltip>
            <TooltipTrigger>
              <button>
                <Emoji emoji={reaction.emoji} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-center">{reaction.emoji}</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
