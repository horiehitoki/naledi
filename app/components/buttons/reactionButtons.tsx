import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Twemoji } from "react-emoji-render";
import { useReactions } from "~/state/post";
import { PostView } from "~/generated/api/types/app/bsky/feed/defs";
import { ReactionData } from "@types";

export default function ReactionButtons({ post }: { post: PostView }) {
  const { state, myReaction, createReaction, cancelReaction } = useReactions(
    post.cid
  );

  const groupedReactions = state.reactions.reduce((acc, reaction) => {
    if (!acc[reaction.reaction.emoji]) {
      acc[reaction.reaction.emoji] = {
        emoji: reaction.reaction.emoji,
        count: 0,
        reactions: [],
      };
    }
    acc[reaction.reaction.emoji].count++;
    acc[reaction.reaction.emoji].reactions.push(reaction);
    return acc;
  }, {} as Record<string, { emoji: string; count: number; reactions: ReactionData[] }>);

  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(groupedReactions).map((group) => (
        <TooltipProvider key={group.emoji}>
          <Tooltip>
            <TooltipTrigger>
              <button
                onClick={() =>
                  myReaction?.reaction.emoji === group.emoji
                    ? cancelReaction()
                    : createReaction(group.emoji)
                }
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm transition-colors ${
                  myReaction?.reaction.emoji === group.emoji
                    ? "bg-pink-400 hover:bg-gray-200"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200"
                }`}
              >
                <Twemoji
                  text={`:${group.emoji}:`}
                  options={{ className: "text-base" }}
                />
                <span className="ml-1">{group.count}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-center">
                :{group.emoji}:
                <br />
                {group.reactions.map((reaction, i) => (
                  <div key={reaction.reaction.id}>
                    {reaction.author.displayName || reaction.author.handle}
                    {i < group.reactions.length - 1 && ","}
                  </div>
                ))}
                がリアクション
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
