import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { BlueMojiCollectionItem } from "~/generated/api";
import { usePost, useReaction } from "~/state/post";
import { useProfile } from "~/state/profile";
import EmojiRender from "../emoji/emojiRender";
import { Reaction } from "~/generated/api/types/app/netlify/stellarbsky/getReaction";

export default function ReactionButtons({ cid }: { cid: string }) {
  const post = usePost(cid);
  const profile = useProfile();

  const { reaction, cancelReaction } = useReaction(cid);

  const groupedReactions = new Map();
  post.reactions.forEach((r: Reaction) => {
    const key = r.emojiRef!.rkey + ":" + r.emojiRef!.repo;

    if (!groupedReactions.has(key)) {
      groupedReactions.set(key, { count: 0, reactions: [] });
    }

    groupedReactions.get(key).count++;
    groupedReactions.get(key).reactions.push(r);
  });

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {[...groupedReactions.values()].map(({ count, reactions }) => {
          const emoji: BlueMojiCollectionItem.ItemView = reactions[0].emoji;

          const myReactions = reactions.filter(
            (r: Reaction) => r.actor?.data?.did === profile?.did
          );

          return (
            <Tooltip key={reactions[0].rkey}>
              <TooltipTrigger>
                <button
                  onClick={() =>
                    myReactions.length > 0
                      ? cancelReaction(myReactions[0])
                      : reaction(
                          reactions[0].emojiRef!.rkey,
                          reactions[0].emojiRef!.repo
                        )
                  }
                  className={`relative flex items-center space-x-2 px-2 py-1 rounded-lg text-sm font-medium transition-all ${
                    myReactions.length > 0
                      ? "bg-purple-900 text-white border-2 border-purple-400"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <p>
                    <EmojiRender
                      record={reactions[0].emoji}
                      repo={reactions[0].emojiRef!.repo}
                    />
                  </p>
                  <span className="ml-1">{count}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-center">{emoji.name}</div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
