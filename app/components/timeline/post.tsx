import { AppBskyEmbedImages } from "@atproto/api";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useEffect, useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Repeat2 } from "lucide-react";
import {
  PostView,
  ReasonPin,
  ReasonRepost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useSetPost } from "~/state/post";

export default function Post({
  post,
  reason,
}: {
  post: PostView;
  reason:
    | ReasonRepost
    | ReasonPin
    | { [k: string]: unknown; $type: string }
    | undefined;
}) {
  const setState = useSetPost(post.cid);

  useEffect(() => {
    setState({
      uri: post.uri,
      cid: post.cid,
      isReposted: post.viewer?.repost ? true : false,
      isLiked: post.viewer?.like ? true : false,
      repostCount: post.repostCount ?? 0,
      likeCount: post.likeCount ?? 0,
      reactions: [],
      likeUri: post.viewer?.like ?? "",
      repostUri: post.viewer?.repost ?? "",
    });
  }, [post, setState]);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const images = (post.embed as AppBskyEmbedImages.View)?.images;
  const slides = images?.map((image) => ({
    src: image.fullsize,
    width: 1664,
    height: 936,
  }));

  return (
    <div className="max-w-96">
      {reason?.by ? (
        <h1 className="font-bold flex">
          <Repeat2 className="mx-3" />
          <h1>{reason.by.displayName + "がリポスト"}</h1>
        </h1>
      ) : (
        ""
      )}

      <Card>
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
      </Card>
    </div>
  );
}
