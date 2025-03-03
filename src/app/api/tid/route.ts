import { NextResponse } from "next/server";
import { TID } from "@atproto/common";

//TIDの生成がクライアントでは動かなかったのでサーバーでやる
const GET = () => {
  return NextResponse.json(TID.nextStr());
};

export { GET };
