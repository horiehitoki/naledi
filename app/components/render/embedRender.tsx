import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedVideo,
  AppBskyFeedDefs,
  AppBskyEmbedRecord,
  AppBskyGraphDefs,
} from "@atproto/api";
import { ExternalLinkIcon, ListIcon, HashIcon } from "lucide-react";
import { Lightbox } from "yet-another-react-lightbox";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import FacetRender from "./facetRender";
import {
  FeedViewPost,
  PostView,
} from "~/generated/api/types/app/bsky/feed/defs";
import ReactPlayer from "react-player";

interface PostEmbedProps {
  content: FeedViewPost["post"]["embed"];
}

export default function EmbedRender({ content }: PostEmbedProps) {
  if (!content) return null;

  if (AppBskyEmbedImages.isView(content)) {
    return <ImageEmbed content={content} />;
  }

  if (AppBskyEmbedExternal.isView(content)) {
    return <ExternalLink content={content} />;
  }

  if (AppBskyEmbedVideo.isView(content)) {
    return <VideoEmbed content={content} />;
  }

  if (AppBskyEmbedRecord.isView(content)) {
    return <RecordEmbed content={content} />;
  }

  return null;
}

function RecordEmbed({ content }: { content: AppBskyEmbedRecord.View }) {
  const record = content.record;

  if (AppBskyFeedDefs.isGeneratorView(record)) {
    return (
      <Card className="p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={record.avatar} />
            <AvatarFallback>
              <HashIcon className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-medium text-sm truncate">
              {record.displayName}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {record.description}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              by @{record.creator.handle}
            </span>
          </div>
        </div>
      </Card>
    );
  }

  if (AppBskyGraphDefs.isListView(record)) {
    const purpose =
      record.purpose === "app.bsky.graph.defs#modlist"
        ? "モデレーションリスト"
        : record.purpose === "app.bsky.graph.defs#curatelist"
        ? "キュレーションリスト"
        : "リスト";
    return (
      <Card className="p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={record.avatar} />
            <AvatarFallback>
              <ListIcon className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-medium text-sm truncate">{record.name}</span>
            <span className="text-xs text-gray-500 truncate">
              {record.description}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {purpose} by @{record.creator.handle}
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return <QuotedPost post={record as unknown as PostView} />;
}

function QuotedPost({ post }: { post: PostView }) {
  return (
    <Card>
      <CardHeader>
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
              <p className="font-semibold text-sm">{post.author.displayName}</p>
              <p className="text-xs text-muted-foreground">
                @{post.author.handle}
              </p>
            </div>
          </div>
        </a>
      </CardHeader>

      <CardContent>
        <FacetRender
          text={post.value.text as string}
          facets={post.value.facets}
        />
        {post.embed && (
          <div className="mt-2">
            <EmbedRender content={post.value.embed} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ExternalLink({ content }: { content: AppBskyEmbedExternal.View }) {
  const { external } = content;
  if (!external) return null;

  return (
    <a href={external.uri} rel="noopener noreferrer" className="block">
      <Card className="overflow-hidden hover:opacity-90 transition-opacity">
        {external.thumb && (
          <div className="relative aspect-[1.91/1] overflow-hidden">
            <img
              src={external.thumb}
              alt={external.title || "External content"}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-3 space-y-1">
          <div className="flex items-center gap-1 text-gray-500">
            <ExternalLinkIcon className="w-4 h-4" />
            <span className="text-xs">{new URL(external.uri).hostname}</span>
          </div>
          <h3 className="font-medium text-sm line-clamp-2">{external.title}</h3>
          {external.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {external.description}
            </p>
          )}
        </div>
      </Card>
    </a>
  );
}

function VideoEmbed({ content }: { content: AppBskyEmbedVideo.View }) {
  return (
    <ReactPlayer
      url={content.playlist}
      className="react-player"
      controls={true}
      width="100%"
      height="100%"
      playing={false}
    />
  );
}

function ImageEmbed({ content }: { content: AppBskyEmbedImages.View }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = content.images;

  const slides = images?.map((image) => ({
    src: image.fullsize,
    width: 1664,
    height: 936,
  }));

  return (
    <div>
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
    </div>
  );
}
