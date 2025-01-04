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

export default function ReactionButtons({ cid }: { cid: string }) {
  const post = usePost(cid);
  const profile = useProfile();

  const { reaction, cancelReaction } = useReaction(cid);

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {post.reactions.map((r) => {
          const emoji: BlueMojiCollectionItem.ItemView = r.emoji;

          return (
            <Tooltip key={r.rkey}>
              <TooltipTrigger>
                <button
                  onClick={() =>
                    r.actor.data.did == profile!.did
                      ? cancelReaction(r)
                      : reaction(r.emojiRef!.rkey, r.emojiRef!.repo)
                  }
                  className={`relative flex items-center space-x-2 px-2 py-1 rounded-lg text-sm font-medium transition-all ${
                    r.actor.data.did == profile!.did
                      ? "bg-purple-900 text-white border-2 border-purple-400"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <p>
                    <EmojiRender record={r.emoji} repo={r.emojiRef!.repo} />
                  </p>
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
