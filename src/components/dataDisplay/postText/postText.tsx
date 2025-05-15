"use client";

import { getHandle } from "@/lib/utils/text";
import {
  RichText,
  AppBskyFeedPost,
  RichTextSegment,
  Facet,
} from "@atproto/api";
import type { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Link from "next/link";
import { Fragment } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { BiLinkExternal } from "react-icons/bi";
import PostTag from "../postTag/PostTag";
import { BlueMojiRichtextFacet } from "../../../../types/atmosphere";
import Image from "next/image";

interface Props {
  record: PostView["record"];
  truncate?: boolean;
  mode?: "thread" | "feed";
}

export default function PostText(props: Props) {
  const { record, truncate, mode = "feed" } = props;
  const text = AppBskyFeedPost.isRecord(record) && record.text;
  const facet = AppBskyFeedPost.isRecord(record) && record.facets;
  const tags = AppBskyFeedPost.isRecord(record) && record.tags;

  const richText = new RichText({
    text: text.toString(),
    facets: facet ? facet : [],
  });

  const content: { text: string; component: JSX.Element }[] = [];

  for (const segment of richText.segments()) {
    if (segment.isMention()) {
      content.push({
        text: segment.text,
        component: (
          <>
            {segment.mention?.did && (
              <Link
                className="text-skin-link-base hover:text-skin-link-hover break-after-auto"
                href={`/profile/${getHandle(segment.text)}`}
                key={segment.mention?.did}
                onClick={(e) => e.stopPropagation()}
              >
                {segment.text}
              </Link>
            )}
          </>
        ),
      });
    } else if (segment.isLink()) {
      content.push({
        text: segment.text,
        component: (
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Link
                  className="text-skin-link-base hover:text-skin-link-hover break-all"
                  href={segment.link?.uri!}
                  target="_blank"
                  key={segment.link?.uri}
                  onClick={(e) => e.stopPropagation()}
                >
                  {segment.text}
                </Link>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="flex flex-col gap-1 bg-skin-base z-[60] p-3 border border-skin-base rounded-xl max-w-xs shadow-lg m-3">
                  <div className="flex flex-wrap items-center gap-2 text-lg">
                    <BiLinkExternal />
                    <span className="block text-skin-base font-medium">
                      Link
                    </span>
                  </div>

                  <Link
                    className="text-skin-link-base hover:text-skin-link-hover break-all"
                    href={segment.link?.uri!}
                    target="_blank"
                    key={segment.link?.uri}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {segment.link?.uri}
                  </Link>
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        ),
      });
    } else if (segment.isTag()) {
      const encodedTag = encodeURIComponent(segment.tag?.tag!);
      content.push({
        text: segment.text,
        component: (
          <Link
            href={`/search?query=%23${encodedTag}`}
            key={segment.text}
            className="text-skin-link-base hover:text-skin-link-hover break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {segment.text}
          </Link>
        ),
      });
    } else if (isBluemojiSegment(segment)) {
      const bluemoji = getBluemojiFeature(segment.facet!);
      if (bluemoji) {
        content.push({
          text: segment.text,
          component: (
            <span
              className="inline-flex items-center translate-y-1.5 whitespace-break-spaces"
              title={bluemoji.alt || bluemoji.name}
              key={segment.text}
            >
              {bluemoji.formats.png_128 ? (
                <Image
                  src={`https://cdn.bsky.app/img/feed_thumbnail/plain/${bluemoji.did}/${bluemoji.formats.png_128}@png`}
                  alt={bluemoji.name}
                  width={24}
                  height={24}
                />
              ) : (
                <span>{segment.text}</span>
              )}
            </span>
          ),
        });
      }
    } else {
      content.push({
        text: segment.text,
        component: (
          <span key={segment.text} className="text-skin-base">
            {segment.text}
          </span>
        ),
      });
    }
  }

  return (
    <div
      dir="auto"
      className={`text-skin-base whitespace-pre-wrap [overflow-wrap:anywhere] ${
        truncate && "line-clamp-6"
      } ${mode === "feed" ? "text-base leading-5" : "text-lg leading-6"}`}
    >
      {content.map((segment, i) => (
        <Fragment key={`${i}+${text}`}>{segment.component}</Fragment>
      ))}
      {tags && (
        <div className="flex flex-wrap gap-2 my-2">
          {tags.map((t, i) => (
            <PostTag key={i} tag={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function isBluemojiSegment(segment: RichTextSegment) {
  return segment.facet?.features.some(
    (feature) => feature.$type === "blue.moji.richtext.facet"
  );
}

function getBluemojiFeature(facet: Facet) {
  if (!facet) return undefined;
  const feature = facet.features.find(
    (f) => f.$type === "blue.moji.richtext.facet"
  );
  if (feature && BlueMojiRichtextFacet.isMain(feature)) {
    return feature;
  }
  return undefined;
}
