//TODO 絵文字リアクションがついた投稿のカスタムフィードを作る
export async function loader() {
  return Response.json({
    "@context": ["https://www.w3.org/ns/did/v1"],
    id: "did:plc:bayg5e3ze2ncrf3shypkvgwl",
    service: [
      {
        id: "#bsky_fg",
        type: "BskyFeedGenerator",
        serviceEndpoint: `https://stellar.maril.blue`,
      },
    ],
  });
}
