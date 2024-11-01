import { AppBskyEmbedImages } from "@atproto/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
    <Card key={post.cid} className="my-5">
      <CardHeader>
        <a href={`/user?handle=${post.author.handle}`}>
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
    </Card>
  );
};
