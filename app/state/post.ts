import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { useState } from "react";
import { atomFamily, useRecoilValue, useSetRecoilState } from "recoil";
import { BlueMojiCollectionItem } from "~/generated/api";
import { Reaction } from "~/generated/api/types/blue/maril/stellar/getReactions";
import { useToast } from "~/hooks/use-toast";

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

//投稿に対する各操作
export const useLike = (postId: string) => {
  const state = usePost(postId);
  const setState = useSetPost(postId);
  const { toast } = useToast();

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

      if (json.error) {
        toast({
          title: "Error",
          description: json.error,
          variant: "destructive",
        });
      }

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

      const json = await res.json();

      if (json.error) {
        toast({
          title: "Error",
          description: json.error,
          variant: "destructive",
        });
      }

      return res;
    }
  }

  return { like, cancelLike };
};

export const useRepost = (postId: string) => {
  const state = usePost(postId);
  const setState = useSetPost(postId);
  const { toast } = useToast();

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

      if (json.error) {
        toast({
          title: "Error",
          description: json.error,
          variant: "destructive",
        });
      }

      //あとからuriをSet
      setState((prev) => ({
        ...prev,
        repostUri: json.uri,
      }));

      toast({
        title: "Error",
        description: json.error,
        variant: "destructive",
      });

      toast({
        title: "リポストしました。",
      });
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

      const json = await res.json();

      if (json.error) {
        toast({
          title: "Error",
          description: json.error,
          variant: "destructive",
        });
      }

      toast({
        title: "リポストを取り消しました。",
      });
    }
  }

  return { repost, cancelRepost };
};

export const useReaction = (postId: string) => {
  const post = usePost(postId);
  const setState = useSetPost(postId);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function reaction(
    rkey: string,
    repo: string,
    emoji: BlueMojiCollectionItem.ItemView,
    actor: ProfileView
  ) {
    if (!isLoading) {
      setIsLoading(true);

      const tidRes = await fetch("/api/generateTID");
      const tidJson = await tidRes.json();
      const record_rkey = tidJson.tid;

      setState((prev) => ({
        ...prev,
        reactions: [
          ...prev.reactions,
          {
            rkey: record_rkey,
            subject: {
              uri: post.uri,
              cid: post.cid,
            },
            createdAt: new Date().toISOString(),
            emojiRef: {
              rkey,
              repo,
            },
            emoji,
            actor,
          },
        ],
      }));

      const res = await fetch("/api/reaction/", {
        method: "POST",
        body: JSON.stringify({
          subject: { uri: post.uri, cid: post.cid },
          rkey: record_rkey,
          emoji_rkey: rkey,
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
      }

      setIsLoading(false);
    }
  }

  async function cancelReaction(rkey: string) {
    if (!isLoading) {
      setIsLoading(true);

      setState((prev) => ({
        ...prev,
        reactions: prev.reactions.filter((reaction) => reaction.rkey !== rkey),
      }));

      const res = await fetch("/api/reaction/", {
        method: "DELETE",
        body: JSON.stringify({
          rkey: rkey,
        }),
      });

      const json = await res.json();

      if (json.error) {
        toast({
          title: "Error",
          description: json.error,
          variant: "destructive",
        });
      }

      setIsLoading(false);
    }
  }
  return { reaction, cancelReaction, isLoading };
};
