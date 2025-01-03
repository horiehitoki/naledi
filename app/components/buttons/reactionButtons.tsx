import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { BlueMojiCollectionItem } from "~/generated/api";
import { usePost, useReaction } from "~/state/post";
import { useProfile } from "~/state/profile";

export default function ReactionButtons({ cid }: { cid: string }) {
  const post = usePost(cid);
  const profile = useProfile();

  const { reaction, cancelReaction } = useReaction(cid);

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {post.reactions.map((reaction) => {
          const emoji: BlueMojiCollectionItem.ItemView = JSON.parse(
            reaction.emoji
          );

          return (
            <Tooltip key={reaction.rkey}>
              <TooltipTrigger>
                <button
                  onClick={() =>
                    reaction.actor.data.did == profile!.did
                      ? cancelReaction(reaction)
                      : () => {}
                  }
                  className="relative flex items-center space-x-2 px-2 py-1 rounded-lg text-sm font-medium transition-all bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  <p className="text-lg font-semibold">
                    <img
                      src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${
                        reaction.actor.data.did
                      }/${emoji.formats.png_128!.ref.$link}@jpeg`}
                      alt={emoji.alt}
                      className="w-6 h-6"
                    />
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
