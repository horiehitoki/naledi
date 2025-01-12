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
import { Ellipsis, MessageCircle, Repeat2, Smile } from "lucide-react";
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
import { Reaction } from "~/generated/api/types/blue/maril/stellar/getReaction";
import ReactionButtons from "../buttons/reactionButtons";
import FacetRender from "../render/facetRender";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useProfile } from "~/state/profile";
import { useToast } from "~/hooks/use-toast";

export default function Post({
  post,
  reason,
  reactions,
}: {
  post: PostView;
  reason?:
    | ReasonRepost
    | ReasonPin
    | { [k: string]: unknown; $type: string }
    | undefined;
  reactions: Reaction[] | undefined;
}) {
  const setState = useSetPost(post.cid);

  const myProfile = useProfile();
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setState({
      uri: post.uri,
      cid: post.cid,
      isReposted: post.viewer?.repost ? true : false,
      isLiked: post.viewer?.like ? true : false,
      repostCount: post.repostCount ?? 0,
      likeCount: post.likeCount ?? 0,
      reactions: reactions ?? [],
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

  const record = post.record as PostView;

  async function deletePost() {
    const res = await fetch("/api/post/", {
      method: "DELETE",
      body: JSON.stringify({ postUri: post.uri }),
    });

    const json = await res.json();

    if (json.error) {
      toast({
        title: "Error",
        description: "投稿の削除に失敗しました。",
        variant: "destructive",
      });

      return;
    }
  }

  if (post)
    return (
      <div>
        <Card ref={cardRef} className="rounded-none border-stone-700">
          <CardHeader>
            {reason?.by ? (
              <h1 className="font-bold flex">
                <Repeat2 className="mx-3" />
                <h1>{reason.by.displayName + "がリポスト"}</h1>
              </h1>
            ) : (
              ""
            )}

            <div className="flex justify-between">
              <a
                href={`/user/${post.author.handle}/posts`}
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
              <div>
                {post.author.did === myProfile!.did ? (
                  <Dialog>
                    <DialogTrigger>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>投稿を削除する</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>本当に削除しますか?</DialogTitle>
                        <DialogDescription>
                          この操作を取り消すことはできません。
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose>
                          <Button
                            className="bg-red-500 text-white"
                            onClick={deletePost}
                          >
                            削除
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : (
                  ""
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <FacetRender text={record.text as string} facets={record.facets} />

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
                        images.length === 3 && index === 2
                          ? "md:col-span-2"
                          : ""
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

                <a href={`/thread?uri=${post.uri}`}>
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

            <div className="flex flex-wrap items-center gap-4 mt-2 pickerOpen">
              {reactions && reactions?.length > 0 ? (
                <ReactionButtons cid={post.cid} />
              ) : (
                ""
              )}

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
