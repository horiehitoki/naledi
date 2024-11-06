import { AppBskyEmbedImages } from "@atproto/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "../ui/button";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";

export const Post = ({ post }: { post: PostView }) => {
  let images;
  let slides;
  try {
    //@ts-ignore
    images = post.embed?.images as AppBskyEmbedImages.View;

    //@ts-ignore
    slides = images.map((image) => {
      return { src: image.fullsize, width: 1664, height: 936 };
    });
  } catch (e) {
    null;
  }
  const [open, setOpen] = useState(false);

  return (
    <Card key={post.cid}>
      <CardHeader>
        <a href={`/home/user?handle=${post.author.handle}`}>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={post.author.avatar}
                alt={post.author.displayName}
              />
              <AvatarFallback>
                {post.author.displayName?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.displayName}</p>
              <p className="text-sm text-muted-foreground">
                @{post.author.handle}
              </p>
            </div>
          </div>
        </a>
      </CardHeader>
      <CardContent>
        <p>{post.record.text}</p>
        {images ? (
          <div>
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={slides}
            />
            <button onClick={() => setOpen(true)}>
              <img
                src={images[0].thumb}
                alt="thumb"
                className="w-1/2 h-1/2"
              ></img>
            </button>
          </div>
        ) : (
          ""
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <Heart className="w-4 h-4" />
            <span></span>
            <span className="sr-only">Likes</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <Repeat2 className="w-4 h-4" />
            <span></span>
            <span className="sr-only">RT</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <MessageCircle className="w-4 h-4" />
            <span></span>
            <span className="sr-only">Comments</span>
          </Button>
        </div>
        <span className="text-sm text-muted-foreground"></span>
      </CardFooter>
    </Card>
  );
};
