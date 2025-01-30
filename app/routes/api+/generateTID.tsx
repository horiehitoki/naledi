import { TID } from "@atproto/common";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const tid = TID.nextStr();

  return Response.json({ tid });
};
