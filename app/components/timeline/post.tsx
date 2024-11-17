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
import { PostView } from "~/generated/api/types/app/bsky/feed/defs";

export const Post = ({ post }: { post: PostView }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleEmojiPicker = useOutletContext<toggleEmojiPicker>();

  //画像ビューワーのセットアップ
  //@ts-ignore
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
          <h1>{post.author.displayName + "がリポスト"}</h1>
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
          <a href={`/home/threads?uri=${post.uri}`}>
            <p className="text-sm">{post.record.text}</p>
          </a>

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
        <CardFooter className="flex justify-between items-center pt-2">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-blue-500 hover:bg-blue-50"
            >
              <Repeat2 className="w-4 h-4 mr-1" />
              <span className="text-xs">{post.repostCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hover:text-green-500 hover:bg-green-50"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">{post.replyCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hover:text-red-500 hover:bg-red-50"
            >
              <Heart className="w-4 h-4 mr-1" />
              <span className="text-xs">{post.likeCount}</span>
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  toggleEmojiPicker(
                    post.id as string,
                    post.uri,
                    post.cid,
                    cardRef.current!
                  )
                }
                className="hover:text-yellow-500 hover:bg-yellow-50"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
