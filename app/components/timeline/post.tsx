import { AppBskyEmbedImages } from "@atproto/api";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "~/components/ui/button";
import { MessageCircle, Repeat2, Smile } from "lucide-react";
import { useOutletContext } from "@remix-run/react";
import { PostData, toggleEmojiPicker } from "@types";
import ReactionButtons from "../buttons/reactionButtons";
import { RepostButton } from "../buttons/repostButton";
import { LikeButton } from "../buttons/likeButton";
import { useSetPost } from "~/state/post";

export const Post = ({ data }: { data: PostData }) => {
  const { reaction } = data;
  const { post } = data.post;
  const { reason } = data.post;

  const setState = useSetPost(post.cid);

  useEffect(() => {
    setState({
      uri: post.uri,
      cid: post.cid,
      isReposted: post.viewer?.repost ? true : false,
      isLiked: post.viewer?.like ? true : false,
      repostCount: post.repostCount!,
      likeCount: post.likeCount!,
      reactions: reaction,
      likeUri: post.viewer?.like ?? "",
      repostUri: post.viewer?.repost ?? "",
    });
  }, [post, reaction, setState]);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleEmojiPicker = useOutletContext<toggleEmojiPicker>();

  //画像ビューワーのセットアップ
  const images = post.embed?.images as AppBskyEmbedImages.View | undefined;

  //@ts-expect-error todo
  const slides = images?.map((image) => ({
    src: image.fullsize,
    width: 1664,
    height: 936,
  }));

  return (
    <div className="md:max-w-2xl">
      {reason ? (
        <h1 className="font-bold flex">
          <Repeat2 className="mx-3" />
          <h1>{reason.by.displayName + "がリポスト"}</h1>
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
              <RepostButton post={post} />

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

              <LikeButton post={post} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <ReactionButtons post={post} />

            <button
              onClick={() =>
                toggleEmojiPicker(
                  post.id as string,
                  post.uri,
                  post.cid,
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
