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
    return <span className="whitespace-break-spaces">{text}</span>;
  }

  const richText = new RichText({
    text: text.toString(),
    facets: facets,
  });
  const segments = richText.segments();
  const content: JSX.Element[] = [];
  let index = 0;

  //セグメントごとにfacetの種類を判定
  for (const segment of segments) {
    const segmentContent = renderSegment(segment, index);
    content.push(segmentContent);

    index++;
  }

  return <span>{content}</span>;
}

function renderSegment(segment: RichTextSegment, index: number): JSX.Element {
  if (segment.isMention()) {
    const mention = segment.mention;
    return (
      <a
        key={`mention-${index}`}
        href={`/user/${mention!.did}/posts`}
        className="text-blue-500 hover:underline whitespace-break-spaces"
      >
        {segment.text}
      </a>
    );
  } else if (segment.isLink()) {
    const link = segment.link;
    return (
      <a
        key={`link-${index}`}
        href={link!.uri}
        className="text-blue-500 hover:underline whitespace-break-spaces"
      >
        {segment.text}
      </a>
    );
  } else if (segment.isTag()) {
    const tag = segment.tag;
    return (
      <a
        key={`tag-${index}`}
        href={`/search?query=${encodeURIComponent(`#${tag?.tag}`)}`}
        className="text-blue-500 hover:underline whitespace-break-spaces"
      >
        {segment.text}
      </a>
    );
  } else if (isBluemojiSegment(segment)) {
    const bluemoji = getBluemojiFeature(segment.facet);
    if (bluemoji) {
      return (
        <span
          key={`bluemoji-${index}`}
          className="inline-flex items-center translate-y-1.5 whitespace-break-spaces"
          title={bluemoji.alt || bluemoji.name}
        >
          {bluemoji.formats.png_128 ? (
            <EmojiRender
              repo={bluemoji.did}
              cid={bluemoji.formats.png_128 as string}
              name={bluemoji.name as string}
            />
          ) : (
            <span className="whitespace-break-spaces">{segment.text}</span>
          )}
        </span>
      );
    }
  }

  return (
    <span key={`text-${index}`} className="whitespace-break-spaces">
      {segment.text}
    </span>
  );
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
