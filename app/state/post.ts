import { atomFamily, useRecoilValue, useSetRecoilState } from "recoil";
import { useProfile } from "./profile";
import { Reaction } from "~/generated/api/types/app/netlify/stellarbsky/getReaction";
import { BlueMojiCollectionItem } from "~/generated/api";

export const postState = atomFamily<
  {
    uri: string;
    cid: string;
    isLiked: boolean;
    isReposted: boolean;
    likeCount: number;
    repostCount: number;
    reactions: Reaction[];
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
      //楽観的UI
      setState((prev) => ({
        ...prev,
        isLiked: true,
        likeCount: prev.likeCount + 1,
      }));

      const res = await fetch("/api/like/", {
        method: "POST",
        body: JSON.stringify({ uri: state.uri, cid: state.cid }),
      });

      const json = await res.json();

      //あとからuriをSet
      setState((prev) => ({
        ...prev,
        likeUri: json.uri,
      }));
      return res;
    }
  }

  async function cancelLike() {
    if (state.likeUri) {
      setState((prev) => ({
        ...prev,
        isLiked: false,
        likeUri: "",
        likeCount: prev.likeCount - 1,
      }));

      const res = await fetch("/api/like/", {
        method: "DELETE",
        body: JSON.stringify({ likeUri: state.likeUri }),
      });

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
      //楽観的UI
      setState((prev) => ({
        ...prev,
        isReposted: true,
        repostCount: prev.repostCount + 1,
      }));

      const res = await fetch("/api/repost/", {
        method: "POST",
        body: JSON.stringify({ uri: state.uri, cid: state.cid }),
      });
      const json = await res.json();

      //あとからuriをSet
      setState((prev) => ({
        ...prev,
        repostUri: json.uri,
      }));
      return res;
    }
  }

  async function cancelRepost() {
    if (state.repostUri) {
      setState((prev) => ({
        ...prev,
        isReposted: false,
        repostUri: "",
        repostCount: prev.repostCount - 1,
      }));

      const res = await fetch("/api/repost/", {
        method: "DELETE",
        body: JSON.stringify({ repostUri: state.repostUri }),
      });

      return res;
    }
  }

  return { repost, cancelRepost };
};

export const useReaction = (postId: string) => {
  const post = usePost(postId);
  const setState = useSetPost(postId);
  const profile = useProfile();

  async function reaction(emoji: BlueMojiCollectionItem.ItemView) {
    const tempId = `temp-${Date.now()}`;

    //楽観的UI
    setState((prev) => ({
      ...prev,
      reactions: [
        ...prev.reactions,
        {
          rkey: tempId,
          emoji,
          subject: { uri: post.uri, cid: post.cid },
          actor: { data: { did: profile!.did, avatar: profile!.avatar! } },
          createdAt: Date.now().toString(),
        },
      ],
    }));

    const res = await fetch("/api/reaction/", {
      method: "POST",
      body: JSON.stringify({
        subject: { uri: post.uri, cid: post.cid },
        emoji: emoji,
      }),
    });

    const json = await res.json();

    //あとからIDとActor情報をSet
    setState((prev) => ({
      ...prev,
      reactions: prev.reactions.map((r) =>
        r.rkey === tempId ? { ...r, rkey: json.rkey, actor: json.actor } : r
      ),
    }));
  }

  async function cancelReaction(reaction: Reaction) {
    setState((prev) => ({
      ...prev,
      reactions: prev.reactions.filter((r) => r.rkey !== reaction.rkey),
    }));

    await fetch("/api/reaction/", {
      method: "DELETE",
      body: JSON.stringify({
        rkey: reaction.rkey,
      }),
    });
  }
  return { reaction, cancelReaction };
};
