import * as BlueMojiCollectionItem from "~/generated/api/types/blue/moji/collection/item";

interface RenderBlobParams {
  width: number;
  height: number;
  cdnBase: string;
}

export enum BlobTypeEnum {
  PNG = "png",
  GIF = "gif",
  WEBP = "webp",
}

type BlobInfo = {
  did: string;
  record?: BlueMojiCollectionItem.Record;
  cid?: string;
};

export const renderBlobAsImg = (
  item: BlobInfo,
  type: BlobTypeEnum,
  params: RenderBlobParams = {
    width: 128,
    height: 128,
    cdnBase: "https://cdn.bsky.app/img/avatar_thumbnail/plain/",
  }
): string | undefined => {
  try {
    // Validate blob type
    if (!Object.values(BlobTypeEnum).includes(type)) {
      throw new Error(`Invalid blob format type: ${type}`);
    }

    console.log(item);

    const { record, did, cid } = item;

    // Validate did
    if (!did) {
      throw new Error("Missing DID in blob info");
    }

    // Construct the base <img> tag attributes
    const imgAttributes: string[] = [
      `width="${params.width}"`,
      `height="${params.height}"`,
    ];

    // Determine the src attribute
    if (record) {
      if (!BlueMojiCollectionItem.isFormats_v0(record.formats)) {
        throw new Error("Invalid record formats");
      }

      const formatKey = `${type}_${params.width}`;
      const format = record.formats[
        formatKey
      ] as BlueMojiCollectionItem.Blob_v0;

      if (!format || !format.ref) {
        throw new Error(`Missing format reference for key: ${formatKey}`);
      }

      imgAttributes.push(
        `src="${params.cdnBase}/${did}/${format.ref}@${type}"`
      );
    } else if (cid) {
      imgAttributes.push(`src="${params.cdnBase}/${did}/${cid}@${type}"`);
    } else {
      throw new Error("Either record or cid must be provided in blob info");
    }

    // Return the constructed <img> tag
    return `<img ${imgAttributes.join(" ")} />`;
  } catch (error) {
    console.error("Failed to render blob as img:", error);
    return undefined; // Return undefined to indicate failure
  }
};
