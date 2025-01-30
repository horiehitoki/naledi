import { TID } from "@atproto/common";
import type { LoaderFunction } from "@remix-run/node";

//レコードキー生成がクライアントサイドでは動かないのでサーバーサイドでやる
export const loader: LoaderFunction = async () => {
  const tid = TID.nextStr();

  return Response.json({ tid });
};
