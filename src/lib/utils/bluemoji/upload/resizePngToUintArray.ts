import { PNG } from "pngjs";
import { Buffer } from "buffer";
import UPNG from "upng-js";

export async function resizePngToUintArray(
  arrayBuffer: ArrayBuffer,
  size: number
) {
  const buffer = Buffer.from(new Uint8Array(arrayBuffer));
  const png = new PNG();

  await new Promise((resolve, reject) => {
    png.parse(buffer, (err, data) => {
      if (err) {
        reject("PNG decode error: " + err);
      } else {
        resolve(data);
      }
    });
  });

  const imageData = new ImageData(
    new Uint8ClampedArray(png.data),
    png.width,
    png.height
  );

  const bitmap = await createImageBitmap(imageData, {
    resizeWidth: size,
    resizeHeight: size,
  });

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0);

  const imgData = ctx.getImageData(0, 0, size, size);
  const rgbaBuffer = imgData.data.buffer;

  const apng = UPNG.encode([rgbaBuffer], size, size, 0);
  return new Uint8Array(apng);
}
