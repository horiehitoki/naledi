import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { BlueMojiCollectionItem } from "~/generated/api";
import { usePost, useReaction } from "~/state/post";
import { useProfile } from "~/state/profile";
import EmojiRender from "../render/emojiRender";
import { Reaction } from "~/generated/api/types/blue/maril/stellar/getReactions";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { useToast } from "~/hooks/use-toast";
import { useState } from "react";
import { ProfileView } from "~/generated/api/types/app/bsky/actor/defs";

export default function ReactionButtons({ cid }: { cid: string }) {
  const post = usePost(cid);
  const profile = useProfile();

  const { reaction, cancelReaction, isLoading } = useReaction(cid);
  const { toast } = useToast();

  //楽観的更新用のState
  const [isReacted, setIsReacted] = useState(false);

  //リアクションをグループ化して表示
  const groupedReactions = new Map();
  post.reactions.forEach((r: Reaction) => {
    const key = r.emojiRef!.rkey + ":" + r.emojiRef!.repo;

    if (!groupedReactions.has(key)) {
      groupedReactions.set(key, { count: 0, group: [] });
    }

    groupedReactions.get(key).count++;
    groupedReactions.get(key).group.push(r);
  });

  async function copyBluemojiToPDS(rkey: string, repo: string) {
    const res = await fetch("/api/copyEmoji", {
      method: "POST",
      body: JSON.stringify({
        rkey,
        repo,
      }),
    });

    const json = await res.json();

    if (json.error) {
      toast({
        title: "Error",
        description: json.error,
        variant: "destructive",
      });
    } else {
      {
        toast({
          title: "絵文字のコピーに成功しました。",
        });

        window.location.reload();
      }
    }
  }

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {[...groupedReactions.values()].map(({ count, group }) => {
          const emoji: BlueMojiCollectionItem.ItemView = group[0].emoji;

          //自分のしたリアクションをフィルター
          const myReactions = group.filter(
            (r: Reaction) => r.actor.did === profile?.did
          );

          const handleReaction = async (
            rkey: string,
            repo: string,
            emoji: BlueMojiCollectionItem.ItemView,
            profile: ProfileView
          ) => {
            if (isLoading) return;

            if (myReactions.length > 0) {
              //UIの楽観的更新
              setIsReacted(false);
              await cancelReaction(myReactions[0].rkey);
            } else {
              setIsReacted(true);
              await reaction(rkey, repo, emoji, profile);
            }
          };

          return (
            <Tooltip key={group[0].rkey}>
              <TooltipTrigger>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <button
                      onClick={() =>
                        handleReaction(
                          group[0].emojiRef.rkey,
                          group[0].emojiRef.repo,
                          group[0].emoji,
                          profile!
                        )
                      }
                      className={`relative flex items-center space-x-2 px-2 py-1 rounded-lg text-sm font-medium transition-all ${
                        myReactions.length > 0 || isReacted
                          ? "bg-purple-800 text-white border-2 border-purple-400"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                      disabled={isLoading}
                    >
                      <p>
                        <EmojiRender
                          cid={group[0].emoji.formats.png_128.ref.$link}
                          repo={group[0].emojiRef.repo}
                          name={group[0].emoji.name}
                        />
                      </p>
                      <span className="ml-1">
                        {isReacted ? count + 1 : count}
                      </span>
                    </button>
                  </ContextMenuTrigger>

                  {group[0].emojiRef.repo !== profile?.did ? (
                    <ContextMenuContent>
                      <ContextMenuItem>
                        <button
                          onClick={() =>
                            copyBluemojiToPDS(
                              group[0].emojiRef.rkey,
                              group[0].emojiRef.repo
                            )
                          }
                        >
                          絵文字をPDSにコピー
                        </button>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  ) : (
                    ""
                  )}
                </ContextMenu>
              </TooltipTrigger>
              <TooltipContent className="space-y-2">
                <div className="text-center">{emoji.name}</div>
                {group.map((r: Reaction) => {
                  return (
                    <div className="text-center flex" key={r.rkey}>
                      <a href={`/user/${r.actor.did}/posts`}>
                        <img
                          src={r.actor.avatar}
                          className="w-6 h-6 rounded-full mx-1"
                          alt="avatar"
                        />
                      </a>
                      {r.actor.displayName}がリアクション
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
