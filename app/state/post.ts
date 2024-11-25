import { ReactionData } from "@types";
import { atomFamily, useRecoilValue, useSetRecoilState } from "recoil";
import { sessionState } from "~/state/session";

export const postState = atomFamily<
  {
    uri: string;
    cid: string;
    isLiked: boolean;
    isReposted: boolean;
    likeCount: number;
    repostCount: number;
    reactions: ReactionData[];
    likeUri: string;
    repostUri: string;
  },
  string
>({
  key: "post",
  default: {
    uri: "",
    cid: "",
    isLiked: false,
    isReposted: false,
    likeCount: 0,
    repostCount: 0,
    reactions: [],
    likeUri: "",
    repostUri: "",
  },
});

export const usePost = (id: string) => useRecoilValue(postState(id));
export const useSetPost = (id: string) => useSetRecoilState(postState(id));

export const useReactions = (postId: string) => {
  const state = usePost(postId);
  const setState = useSetPost(postId);
  const profile = useRecoilValue(sessionState);

  const myReaction = state.reactions.find(
    (reaction) => reaction.reaction.createdBy === profile?.did
  );

  const createReaction = async (emoji: string) => {
    setState((prev) => ({
      ...prev,
      reactions: prev.reactions.filter(
        (reaction) => reaction.reaction.id !== myReaction?.reaction.id
      ),
    }));

    const res = await fetch("/api/create/reaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: { uri: state.uri, cid: state.cid },
        emoji,
      }),
    });

    const json = await res.json();

    setState((prev) => ({
      ...prev,
      reactions: [
        ...prev.reactions,
        {
          reaction: {
            id: json.id,
            emoji,
            createdBy: profile!.did,
          },
          author: profile,
        } as ReactionData,
      ],
    }));
  };

  const cancelReaction = async () => {
    await fetch("/api/delete/reaction/", {
      method: "POST",
      body: JSON.stringify({ rkey: myReaction?.reaction.id }),
    });

    setState((prev) => ({
      ...prev,
      reactions: prev.reactions.filter(
        (reaction) => reaction.reaction.id !== myReaction?.reaction.id
      ),
    }));
  };

  return { state, myReaction, createReaction, cancelReaction };
};
