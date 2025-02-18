import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { Reaction } from "../../types/atmosphere/types/blue/maril/stellar/getReactions";

export const reactionState = atomFamily((id: string) =>
  atom({
    uri: id,
    cid: "",
    reactions: [] as Reaction[],
  })
);

export const useReactionState = (id: string) => useAtomValue(reactionState(id));
export const useSetReactionState = (id: string) =>
  useSetAtom(reactionState(id));
