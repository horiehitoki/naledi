import { AppBskyEmbedImages } from "@atproto/api";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { useRef, useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "~/components/ui/button";
import { Heart, MessageCircle, Repeat2, Smile } from "lucide-react";
import { useOutletContext } from "@remix-run/react";
import { toggleEmojiPicker } from "@types";
import { ProfileView } from "~/generated/api/types/app/bsky/actor/defs";
import { Twemoji } from "react-emoji-render";
import { Reaction } from "@prisma/client";

export const Post = (data: any) => {
  const post = data.data.post.post;
  const reaction = data.data.reaction;

  async function like() {
    const res = await fetch("/api/create/like/", {
      method: "POST",
      body: JSON.stringify({ uri: post.uri, cid: post.cid }),
    });

    return res;
  }

  async function cancelLike() {
    const res = await fetch("/api/delete/like/", {
      method: "POST",
      body: JSON.stringify({ likeUri: post.viewer!.like }),
    });

    return res;
  }

  async function repost() {
    const res = await fetch("/api/create/repost/", {
      method: "POST",
      body: JSON.stringify({ uri: post.uri, cid: post.cid }),
    });

    return res;
  }

  async function cancelRepost() {
    const res = await fetch("/api/delete/repost/", {
      method: "POST",
      body: JSON.stringify({ repostUri: post.viewer!.repost }),
    });

    return res;
  }

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { toggleEmojiPicker, profile } = useOutletContext<{
    toggleEmojiPicker: toggleEmojiPicker;
    profile: ProfileView;
  }>();

  //画像ビューワーのセットアップ
  const images = post.embed?.images as AppBskyEmbedImages.View | undefined;

  //@ts-ignore
  const slides = images?.map((image) => ({
    src: image.fullsize,
    width: 1664,
    height: 936,
  }));

  //TODO 正しいユーザーネームを入れる
  return (
    <div className="md:max-w-2xl md:mx-auto">
      {post.viewer?.repost ? (
        <h1 className="font-bold flex">
          <Repeat2 className="mx-3" />
          <h1>{post.viewer.repost.split("/")[2] + "がリポスト"}</h1>
        </h1>
      ) : (
        ""
      )}

      <Card ref={cardRef}>
        <CardHeader>
          <a
            href={`/home/user?handle=${post.author.handle}`}
            className="hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={post.author.avatar}
                  alt={post.author.displayName}
                />
                <AvatarFallback>
                  {post.author.displayName?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">
                  {post.author.displayName}
                </p>
                <p className="text-xs text-muted-foreground">
                  @{post.author.handle}
                </p>
              </div>
            </div>
          </a>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm">{post.record.text}</p>

          {images && (
            <div className="relative">
              <div className="relative z-10">
                <Lightbox
                  open={isLightboxOpen}
                  close={() => setIsLightboxOpen(false)}
                  slides={slides}
                />
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="w-full overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
                >
                  <img
                    src={images[0].thumb}
                    alt="Post attachment"
                    className="w-full h-auto object-cover"
                  />
                </button>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col pt-2 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {post.viewer?.repost ? (
                <Button variant="ghost" size="sm" onClick={cancelRepost}>
                  <Repeat2 className="w-4 h-4 mr-1 text-green-500" />
                  <span className="text-xs">{post.repostCount}</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-green-500 hover:bg-green-50"
                  onClick={repost}
                >
                  <Repeat2 className="w-4 h-4 mr-1" />
                  <span className="text-xs">{post.repostCount}</span>
                </Button>
              )}

              <a href={`/home/threads?uri=${post.uri}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-blue-500 hover:bg-blue-50"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{post.replyCount}</span>
                </Button>
              </a>

              {post.viewer?.like ? (
                <Button variant="ghost" size="sm" onClick={cancelLike}>
                  <Heart className="w-4 h-4 mr-1 text-red-500 fill-red-500" />
                  <span className="text-xs">{post.likeCount}</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-red-500 hover:bg-red-50"
                  onClick={like}
                >
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-xs">{post.likeCount}</span>
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            {reaction.map((data: Reaction) => (
              <button
                key={data.cid}
                className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Twemoji
                  text={`:${data.emoji.replace(/\s+/g, "_")}:`}
                  options={{ className: "text-base" }}
                />
              </button>
            ))}
            <button
              onClick={() =>
                toggleEmojiPicker(
                  post.id as string,
                  post.uri,
                  post.cid,
                  profile,
                  cardRef.current!
                )
              }
              className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
