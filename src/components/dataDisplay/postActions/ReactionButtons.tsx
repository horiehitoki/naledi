import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Reaction } from "../../../../types/atmosphere/types/blue/maril/stellar/getReactions";
import { BlueMojiCollectionItem } from "../../../../types/atmosphere";
import Image from "next/image";

export default function ReactionButtons({
  reactions,
}: {
  reactions: Reaction[];
}) {
  //リアクションをグループ化して表示
  const groupedReactions = new Map();
  reactions.forEach((r: Reaction) => {
    const key = r.emojiRef!.rkey + ":" + r.emojiRef!.repo;

    if (!groupedReactions.has(key)) {
      groupedReactions.set(key, { count: 0, group: [] });
    }

    groupedReactions.get(key).count++;
    groupedReactions.get(key).group.push(r);
  });

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {[...groupedReactions.values()].map(({ count, group }) => {
          const emoji: BlueMojiCollectionItem.ItemView = group[0].emoji;

          if (group[0])
            return (
              <Tooltip key={group[0].rkey}>
                <TooltipTrigger>
                  <button
                    className={`relative flex items-center space-x-2 px-2 py-1 rounded-lg text-sm font-medium transition-all bg-gray-800 text-gray-300 hover:bg-gray-700`}
                  >
                    <p>
                      <Image
                        src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${group[0].emojiRef.repo}/${group[0].emoji.formats.png_128.ref.$link}@png`}
                        alt={group[0].emoji.name}
                        width={24}
                        height={24}
                      />
                    </p>
                    <span className="ml-1">{count}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="flex flex-col gap-1 bg-skin-base z-[60] p-3 border border-skin-base rounded-xl max-w-xs shadow-lg m-3">
                  <div className="text-center">{emoji.name}</div>
                  {group.map((r: Reaction) => {
                    return (
                      <div className="text-center flex" key={r.rkey}>
                        <a href={`/user/${r.actor.did}/posts`}>
                          <Image
                            src={r.actor.avatar}
                            className="rounded-full mx-1"
                            alt="avatar"
                            width={24}
                            height={24}
                          />
                        </a>
                        Reacted by {r.actor.displayName}
                      </div>
                    );
                  })}
                </TooltipContent>
              </Tooltip>
            );
        })}
      </div>
    </TooltipProvider>
  );
}
