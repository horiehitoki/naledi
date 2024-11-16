import { AppBskyEmbedImages } from "@atproto/api";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useRef, useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "~/components/ui/button";
import { Heart, MessageCircle, Repeat2, Smile } from "lucide-react";
import { useOutletContext } from "@remix-run/react";
import { toggleEmojiPicker } from "@types";

export const Post = ({ post }: { post: PostView }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleEmojiPicker = useOutletContext<toggleEmojiPicker>();

  //@ts-ignore
  const images = post.embed?.images as AppBskyEmbedImages.View | undefined;

  //@ts-ignore
  const slides = images?.map((image) => ({
    src: image.fullsize,
    width: 1664,
    height: 936,
  }));

  return (
    <Card className="max-w-2xl mx-auto" ref={cardRef}>
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
              <p className="font-semibold text-sm">{post.author.displayName}</p>
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
            <span className="text-xs">12</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hover:text-green-500 hover:bg-green-50"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            <span className="text-xs">8</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hover:text-red-500 hover:bg-red-50"
          >
            <Heart className="w-4 h-4 mr-1" />
            <span className="text-xs">24</span>
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleEmojiPicker(post.cid, cardRef.current!)}
              className="hover:text-yellow-500 hover:bg-yellow-50"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
