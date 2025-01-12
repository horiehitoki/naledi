import { Facet, RichText, RichTextSegment } from "@atproto/api";
import { BlueMojiRichtextFacet } from "~/generated/api";
import EmojiRender from "./emojiRender";

export default function FacetRender({
  text,
  facets,
}: {
  text: string;
  facets: Facet[];
}) {
  if (!facets || facets.length === 0) {
    return <span className="whitespace-pre-wrap">{text}</span>;
  }

  const richText = new RichText({
    text: text.toString(),
    facets: facets,
  });
  const segments = richText.segments();
  const content: JSX.Element[] = [];
  let index = 0;

  for (const segment of segments) {
    if (segment.isMention()) {
      const mention = segment.mention;
      content.push(
        <a
          key={`mention-${index}`}
          href={`/user/${mention!.did}/posts`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline whitespace-pre-wrap"
        >
          {segment.text}
        </a>
      );
    } else if (segment.isLink()) {
      const link = segment.link;
      content.push(
        <a
          key={`link-${index}`}
          href={link!.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline whitespace-pre-wrap"
        >
          {segment.text}
        </a>
      );
    } else if (segment.isTag()) {
      const tag = segment.tag;
      content.push(
        <a
          key={`tag-${index}`}
          href={tag?.tag}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline whitespace-pre-wrap"
        >
          {segment.text}
        </a>
      );
    } else if (isBluemojiSegment(segment)) {
      const bluemoji = getBluemojiFeature(segment.facet);
      if (bluemoji) {
        content.push(
          <span
            key={`bluemoji-${index}`}
            className="inline-flex items-center align-baseline"
            title={bluemoji.alt || bluemoji.name}
          >
            {bluemoji.formats.png_128 ? (
              <EmojiRender
                repo={bluemoji.did}
                cid={bluemoji.formats.png_128 as string}
                name={bluemoji.name as string}
              />
            ) : (
              <span className="whitespace-pre-wrap">{segment.text}</span>
            )}
          </span>
        );
      } else {
        content.push(
          <span key={`text-${index}`} className="whitespace-pre-wrap">
            {segment.text}
          </span>
        );
      }
    } else {
      content.push(
        <span key={`text-${index}`} className="whitespace-pre-wrap">
          {segment.text}
        </span>
      );
    }
    index++;
  }

  return <span className="inline-flex items-center">{content}</span>;
}

function isBluemojiSegment(segment: RichTextSegment) {
  return segment.facet?.features.some(
    (feature) => feature.$type === "blue.moji.richtext.facet"
  );
}

function getBluemojiFeature(facet) {
  if (!facet) return undefined;
  const feature = facet.features.find(
    (f) => f.$type === "blue.moji.richtext.facet"
  );
  if (feature && BlueMojiRichtextFacet.isMain(feature)) {
    return feature;
  }
  return undefined;
}
