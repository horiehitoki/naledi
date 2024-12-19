import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { usePost, useReaction } from "~/state/post";
import { useProfile } from "~/state/profile";

export default function ReactionButtons({ cid }: { cid: string }) {
  const post = usePost(cid);
  const profile = useProfile();

  const { reaction, cancelReaction } = useReaction(cid);

  //リアクションをカウント
  const emojiSet = new Set();
  const group: { [key: string]: number } = {};

  post.reactions.forEach((reaction) => {
    const name = reaction.emoji;

    if (emojiSet.has(name)) {
      group[name] += 1;
    } else {
      emojiSet.add(name);
      group[name] = 1;
    }
  });

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {Object.keys(group).map((name) => {
          const myReactions = post.reactions.filter(
            (reaction) =>
              reaction.authorDid === profile?.did && reaction.emoji === name
          );

          return (
            <Tooltip key={name}>
              <TooltipTrigger>
                <button
                  onClick={() =>
                    myReactions.length > 0
                      ? cancelReaction(myReactions)
                      : reaction(name)
                  }
                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm transition-colors ${
                    myReactions.length > 0
                      ? "bg-pink-400 hover:bg-gray-200"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <em-emoji shortcodes={name} size={22}></em-emoji>
                  <p>{group[name]}</p>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-center">{name}</div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
