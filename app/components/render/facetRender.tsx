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
    return <span>{text}</span>;
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
          className="text-blue-500 hover:underline"
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
          className="text-blue-500 hover:underline"
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
          className="text-blue-500 hover:underline"
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
            className="inline-block align-middle"
            title={bluemoji.alt || bluemoji.name}
          >
            {bluemoji.formats.png_128 ? (
              <div className="transform translate-y-[-0.6em]">
                <EmojiRender
                  repo={bluemoji.did}
                  cid={bluemoji.formats.png_128 as string}
                  alt={bluemoji.alt as string}
                />
              </div>
            ) : (
              segment.text
            )}
          </span>
        );
      } else {
        content.push(<span key={`text-${index}`}>{segment.text}</span>);
      }
    } else {
      content.push(<span key={`text-${index}`}>{segment.text}</span>);
    }
    index++;
  }

  return <>{content}</>;
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
