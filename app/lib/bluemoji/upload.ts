import * as BlueMojiCollectionItem from "~/generated/api/types/blue/moji/collection/item";
import { Agent } from "@atproto/api";
import sharp from "sharp";
interface UploadBluemojiParams {
  agent: Agent;
  emoji: ArrayBuffer;
  alttext: string;
  emojiName: string;
  encodings?: string[];
  originalEncoding?: string;
}

async function resizePngToUintArray(
  arrayBuffer: ArrayBuffer,
  size: number
): Promise<Uint8Array> {
  const inputBuffer = Buffer.from(arrayBuffer);
  const image = sharp(inputBuffer);

  const resizedBuffer = await image.resize(size, size).toBuffer();

  return new Uint8Array(resizedBuffer);
}

export async function uploadBluemoji({
  agent,
  emoji,
  alttext,
  emojiName,
  encodings = ["png"],
  originalEncoding = "image/png",
}: UploadBluemojiParams) {
  const resizedBytes = await resizePngToUintArray(emoji, 128);
  const originalBytes = new Uint8Array(emoji);

  if (agent?.did && emoji && alttext && emojiName) {
    const formats: BlueMojiCollectionItem.Formats_v0 = {
      $type: "blue.moji.collection.item#formats_v0",
    };

    // Use the bytesAsset version if smaller than 65kb (SUBJECT TO CHANGE)
    if (resizedBytes.byteLength < 65536 && encodings.includes("apng")) {
      formats.apng_128 = resizedBytes;
    }

    if (encodings.includes("lottie")) formats.lottie = originalBytes;

    if (encodings.includes("png")) {
      const { data: pngBlobAsset } = await agent.com.atproto.repo.uploadBlob(
        resizedBytes,
        { encoding: "image/png" }
      );

      formats.png_128 = pngBlobAsset.blob;
    }

    if (encodings.includes("webp")) {
      // // TODO: ENCODE
      // const encoded = "";
      // const { data: webpBlobAsset } = await agent.com.atproto.repo.uploadBlob(
      //   encoded,
      //   { encoding: "image/webp" }
      // );
      // formats.webp_128 = webpBlobAsset.blob;
    }

    if (encodings.includes("gif")) {
      // // TODO: ENCODE
      // const encoded = "";
      // const { data: gifBlobAsset } = await agent.com.atproto.repo.uploadBlob(
      //   encoded,
      //   { encoding: "image/gif" }
      // );
      // formats.webp_128 = gifBlobAsset.blob;
    }

    const { data: originalBlob } = await agent.uploadBlob(originalBytes, {
      encoding: originalEncoding,
    });

    return agent.com.atproto.repo.putRecord({
      validate: false,
      repo: agent.assertDid,
      collection: "blue.moji.collection.item",
      rkey: emojiName.replace(/:/g, ""), // strip colons
      record: {
        name: `:${emojiName.replace(/:/g, "")}:`, // ensure colons are on the name
        alt: alttext,
        createdAt: new Date().toISOString(),
        original: originalBlob.blob,
        formats,
      },
    });
  } else {
    return false;
  }
}
