import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ReactionData } from "@types";
import { Twemoji } from "react-emoji-render";
import { ProfileView } from "~/generated/api/types/app/bsky/actor/defs";
import { PostView } from "~/generated/api/types/app/bsky/feed/defs";

type GroupedReaction = {
  emoji: string;
  count: number;
  reactions: ReactionData[];
};

export default function ReactionButtons({
  post,
  reactions,
  profile,
}: {
  post: PostView;
  reactions: ReactionData[];
  profile: ProfileView;
}) {
  // 同じ絵文字のリアクションをグループ化
  const groupedReactions = reactions.reduce<Record<string, GroupedReaction>>(
    (acc, reaction) => {
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
    },
    {}
  );

  async function createReaction(emoji: string) {
    const res = await fetch("/api/create/reaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: {
          uri: post.uri,
          cid: post.cid,
        },
        emoji: emoji,
      }),
    });

    return res;
  }

  async function cancelReaction(rkey: string) {
    const res = await fetch("/api/delete/reaction/", {
      method: "POST",
      body: JSON.stringify({ rkey: rkey }),
    });
    return res;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(groupedReactions).map((group) => {
        //自分がその絵文字でリアクションしているか判定
        const userReaction = group.reactions.find(
          (r) => r.reaction.createdBy === profile.did
        );

        return (
          <TooltipProvider key={group.emoji}>
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={() =>
                    userReaction //ユーザーがすでにそのリアクションをしていれば
                      ? cancelReaction(userReaction.reaction.id) //レコードを削除
                      : createReaction(group.emoji)
                  }
                  className={
                    userReaction
                      ? "flex items-center space-x-1 bg-pink-400 px-2 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      : "flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  }
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
                  {group.reactions.map((r, i) => (
                    <div key={r.reaction.id}>
                      {r.author.displayName || r.author.handle}
                      {i < group.reactions.length - 1 && ","}
                    </div>
                  ))}
                  がリアクション
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
