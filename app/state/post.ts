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

export const useLike = (postId: string) => {
  const state = usePost(postId);
  const setState = useSetPost(postId);

  async function like() {
    if (!state.likeUri) {
      const res = await fetch("/api/create/like/", {
        method: "POST",
        body: JSON.stringify({ uri: state.uri, cid: state.cid }),
      });
      const json = await res.json();
      setState((prev) => ({
        ...prev,
        isLiked: true,
        likeUri: json.uri,
        likeCount: prev.likeCount + 1,
      }));
      return res;
    }
  }

  async function cancelLike() {
    if (state.likeUri) {
      const res = await fetch("/api/delete/like/", {
        method: "POST",
        body: JSON.stringify({ likeUri: state.likeUri }),
      });
      setState((prev) => ({
        ...prev,
        isLiked: false,
        likeUri: "",
        likeCount: prev.likeCount - 1,
      }));
      return res;
    }
  }

  return { like, cancelLike };
};

export const useRepost = (postId: string) => {
  const state = usePost(postId);
  const setState = useSetPost(postId);

  async function repost() {
    if (!state.repostUri) {
      const res = await fetch("/api/create/repost/", {
        method: "POST",
        body: JSON.stringify({ uri: state.uri, cid: state.cid }),
      });
      const json = await res.json();
      setState((prev) => ({
        ...prev,
        isReposted: true,
        repostUri: json.uri,
        repostCount: prev.repostCount + 1,
      }));
      return res;
    }
  }

  async function cancelRepost() {
    if (state.repostUri) {
      const res = await fetch("/api/delete/repost/", {
        method: "POST",
        body: JSON.stringify({ repostUri: state.repostUri }),
      });
      setState((prev) => ({
        ...prev,
        isReposted: false,
        repostUri: "",
        repostCount: prev.repostCount - 1,
      }));
      return res;
    }
  }

  return { repost, cancelRepost };
};

export const useReactions = (postId: string) => {
  const state = usePost(postId);
  const setState = useSetPost(postId);
  const profile = useRecoilValue(sessionState);

  const myReaction = state.reactions.find(
    (reaction) => reaction.reaction.createdBy === profile?.did
  );

  const createReaction = async (emoji: string) => {
    //自分のリアクションをクリア
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
            uri: state.uri,
            cid: state.cid,
            emoji,
            createdBy: profile!.did,
          },
          author: profile!,
        },
      ],
    }));
  };

  const cancelReaction = async () => {
    if (myReaction?.reaction.id) {
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
    }
  };

  return { state, myReaction, createReaction, cancelReaction };
};
