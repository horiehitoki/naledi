import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Reaction } from "../../../../types/atmosphere/types/blue/maril/stellar/getReactions";
import { BlueMojiCollectionItem } from "../../../../types/atmosphere";
import Image from "next/image";
import { FaSmile } from "react-icons/fa";
import { useEmojiPicker } from "@/app/providers/BluemojiPickerProvider";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useAgent } from "@/app/providers/agent";
import { reaction, removeReaction } from "@/lib/api/stellar";
import { useDebouncedCallback } from "use-debounce";

export default function ReactionButtons({
  uri,
  cid,
  reactions,
  setReactions,
}: {
  uri: string;
  cid: string;
  reactions: Reaction[];
  setReactions: Dispatch<SetStateAction<Reaction[]>>;
}) {
  const { toggleOpen } = useEmojiPicker();
  const ref = useRef<HTMLButtonElement>(null);
  const agent = useAgent();

  const groupedReactions = new Map();
  reactions.forEach((r: Reaction) => {
    const key = r.emojiRef!.rkey + ":" + r.emojiRef!.repo;
    if (!groupedReactions.has(key)) {
      groupedReactions.set(key, { count: 0, group: [] });
    }
    groupedReactions.get(key).count++;
    groupedReactions.get(key).group.push(r);
  });

  const handleReaction = useDebouncedCallback(
    async (
      myReactions: Reaction[],
      rkey: string,
      repo: string,
      targetEmoji: BlueMojiCollectionItem.ItemView
    ) => {
      if (myReactions.length > 0) {
        await removeReaction(agent, myReactions[0].rkey);

        setReactions((prev) =>
          prev.filter((reaction) => reaction.rkey !== myReactions[0].rkey)
        );
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STELLAR_APPVIEW_URL}/tid/`
        );

        const tid = await res.text();

        const actor = await agent.getProfile({
          actor: agent.assertDid,
        });

        setReactions((prev) => [
          ...prev,
          {
            rkey: tid,
            subject: {
              uri,
              cid,
            },
            createdAt: new Date().toISOString(),
            emojiRef: {
              rkey,
              repo,
            },
            emoji: targetEmoji,
            actor: actor.data,
          },
        ]);

        await reaction(agent, { uri, cid }, { rkey, repo }, tid);
      }
    },
    500
  );

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
                          myReactions,
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
