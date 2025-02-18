import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Reaction } from "../../../../types/atmosphere/types/blue/maril/stellar/getReactions";
import Image from "next/image";
import { FaSmile } from "react-icons/fa";
import { useEmojiPicker } from "@/app/providers/BluemojiPickerProvider";
import { useRef } from "react";
import { useAgent } from "@/app/providers/agent";
import useReaction from "@/lib/hooks/useReaction";

export default function ReactionButtons({
  uri,
  cid,
}: {
  uri: string;
  cid: string;
}) {
  const { toggleOpen } = useEmojiPicker();
  const ref = useRef<HTMLButtonElement>(null);
  const agent = useAgent();

  const { groupedReactions, handleReaction } = useReaction({ uri, cid });

  return (
    <div>
      <TooltipProvider>
        <div className="flex flex-wrap gap-2 dark:text-white text-black">
          {[...groupedReactions.values()].map(({ count, group }) => {
            const myReactions = group.filter(
              (r: Reaction) => r.actor.did === agent.did
            );

            if (group[0])
              return (
                <Tooltip key={group[0].rkey}>
                  <TooltipTrigger>
                    <button
                      onClick={() =>
                        handleReaction(
                          group[0].emojiRef.rkey,
                          group[0].emojiRef.repo,
                          group[0].emoji
                        )
                      }
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${
                        myReactions.length > 0
                          ? "bg-purple-700 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <Image
                        src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${group[0].emojiRef.repo}/${group[0].emoji.formats.png_128.ref.$link}@png`}
                        alt={group[0].emoji.name}
                        width={24}
                        height={24}
                      />
                      <span>{count}</span>
                    </button>
                  </TooltipTrigger>

                  <TooltipContent className="flex flex-col gap-1 bg-skin-base z-[60] p-3 border border-skin-base rounded-xl max-w-xs shadow-lg m-3">
                    <div className="text-center text-sm">
                      {group[0].emoji.name}
                    </div>
                    {group.map((r: Reaction) => (
                      <div
                        className="flex items-center gap-1 text-sm"
                        key={r.rkey}
                      >
                        <a href={`/dashboard/user/${r.actor.did}`}>
                          <Image
                            src={r.actor.avatar}
                            className="rounded-full"
                            alt="avatar"
                            width={20}
                            height={20}
                          />
                        </a>
                        <span>{r.actor.displayName}</span>
                      </div>
                    ))}
                  </TooltipContent>
                </Tooltip>
              );
          })}

          <button
            onClick={() => toggleOpen(ref.current!, { uri, cid })}
            ref={ref}
            className="rounded-full p-2"
          >
            <FaSmile className="w-4 h-4 dark:text-white text-black" />
          </button>
        </div>
      </TooltipProvider>
    </div>
  );
}
