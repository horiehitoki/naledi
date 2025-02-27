import { useDebouncedCallback } from "use-debounce";
import { Reaction } from "../../../types/atmosphere/types/blue/maril/stellar/getReactions";
import { BlueMojiCollectionItem } from "../../../types/atmosphere";
import { reaction, removeReaction } from "../api/stellar";
import { useReactionState, useSetReactionState } from "@/state/reactions";
import { useAgent } from "@/app/providers/agent";

type Props = {
  uri: string;
  cid: string;
};

//同じリアクションをグループ化してカウントする
const groupReactions = (reactions: Reaction[]) => {
  const groupedReactions = new Map();
  if (!reactions) return groupedReactions;

  reactions.forEach((r) => {
    const key = `${r.emojiRef!.rkey}:${r.emojiRef!.repo}`;
    if (!groupedReactions.has(key)) {
      groupedReactions.set(key, { count: 0, group: [] });
    }
    groupedReactions.get(key).count++;
    groupedReactions.get(key).group.push(r);
  });

  return groupedReactions;
};

//グループ名から自分のしたリアクションを取得
const getMyReactions = (group: Reaction[], myDid: string) => {
  return group.filter((r) => r.actor.did === myDid);
};

export default function useReaction({ uri, cid }: Props) {
  const { reactions } = useReactionState(cid);

  const setReactions = useSetReactionState(cid);
  const agent = useAgent();

  const groupedReactions = groupReactions(reactions);

  //連打対策でデバウンスする
  const handleReaction = useDebouncedCallback(
    async (
      rkey: string,
      repo: string,
      targetEmoji: BlueMojiCollectionItem.ItemView
    ) => {
      if (!groupedReactions) return;

      //自分のリアクションを取得
      const myReactions = getMyReactions(
        groupedReactions.get(`${rkey}:${repo}`)?.group || [],
        agent.assertDid
      );

      //自分がリアクションしていれば
      if (myReactions.length > 0) {
        //リアクション解除
        await removeReaction(agent, myReactions[0].rkey);
        setReactions((prev) => ({
          uri,
          cid,
          reactions: prev.reactions.filter(
            (r) => r.rkey !== myReactions[0].rkey
          ),
        }));
      } else {
        //リアクションする
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STELLAR_APPVIEW_URL}/tid/`
        );
        const tid = await res.text();
        const actor = await agent.getProfile({ actor: agent.assertDid });

        setReactions((prev) => ({
          uri,
          cid,
          reactions: [
            ...prev.reactions,
            {
              rkey: tid,
              subject: { uri, cid },
              createdAt: new Date().toISOString(),
              emojiRef: { rkey, repo },
              emoji: targetEmoji,
              actor: actor.data,
            },
          ],
        }));

        await reaction(agent, { uri, cid }, { rkey, repo }, tid);
      }
    },
    300
  );

  return { reactions, groupedReactions, handleReaction };
}
