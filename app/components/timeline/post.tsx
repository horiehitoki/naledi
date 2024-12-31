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
import { MessageCircle, Repeat2, Smile } from "lucide-react";
import {
  PostView,
  ReasonPin,
  ReasonRepost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useSetPost } from "~/state/post";
import { RepostButton } from "../buttons/repostButton";
import { LikeButton } from "../buttons/likeButton";
import { Button } from "../ui/button";
import { useEmojiPicker } from "~/state/emojiPicker";
import { Reaction } from "~/generated/api/types/app/netlify/stellarbsky/getReaction";

export default function Post({
  post,
  reason,
  reactions,
}: {
  post: PostView;
  reason:
    | ReasonRepost
    | ReasonPin
    | { [k: string]: unknown; $type: string }
    | undefined;
  reactions: Reaction[];
}) {
  const setState = useSetPost(post.cid);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setState({
      uri: post.uri,
      cid: post.cid,
      isReposted: post.viewer?.repost ? true : false,
      isLiked: post.viewer?.like ? true : false,
      repostCount: post.repostCount ?? 0,
      likeCount: post.likeCount ?? 0,
      reactions: reactions,
      likeUri: post.viewer?.like ?? "",
      repostUri: post.viewer?.repost ?? "",
    });
  }, [post, setState, reactions]);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const images = (post.embed as AppBskyEmbedImages.View)?.images;
  const slides = images?.map((image) => ({
    src: image.fullsize,
    width: 1664,
    height: 936,
  }));

  const { toggleEmojiPicker } = useEmojiPicker();

  return (
    <div>
      {reason?.by ? (
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
            href={`/${post.author.handle}`}
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
          <p>{post.record.text}</p>

          {images && (
            <div className="relative">
              <Lightbox
                open={isLightboxOpen}
                close={() => setIsLightboxOpen(false)}
                slides={slides}
              />
              <div
                className={`grid gap-4 ${
                  images.length === 1
                    ? "grid-cols-1"
                    : images.length === 2
                    ? "grid-cols-2"
                    : "md:grid-cols-3 grid-cols-2"
                }`}
              >
                {images.map((image, index) => (
                  <button
                    key={image.thumb}
                    onClick={() => setIsLightboxOpen(true)}
                    className={`overflow-hidden rounded-lg hover:opacity-90 transition-opacity duration-300 ${
                      images.length === 3 && index === 2 ? "md:col-span-2" : ""
                    }`}
                  >
                    <img
                      src={image.thumb}
                      alt="Thumbnail"
                      className="w-full h-full object-cover aspect-square"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col pt-2 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <RepostButton post={post} />

              <a href={`/post?uri=${post.uri}`}>
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
            <button
              onClick={() =>
                toggleEmojiPicker(post.uri, post.cid, cardRef.current!)
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
}
