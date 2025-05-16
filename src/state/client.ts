import { useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const clientModeState = atomWithStorage<"Default" | "Deck">(
  "mode",
  "Default"
);

export const columnState = atomWithStorage<string[]>("column", ["timeline"]);

export const useClientModeState = () => useAtomValue(clientModeState);
export const useSetClientModeState = () => useSetAtom(clientModeState);
