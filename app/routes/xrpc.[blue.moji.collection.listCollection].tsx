import { LoaderFunction } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import * as BlueMojiCollectionItem from "../generated/api/types/blue/moji/collection/item";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (!agent) return new Response(null, { status: 401 });

  const { data } = await agent.com.atproto.repo.listRecords({
    repo: agent.assertDid,
    collection: "blue.moji.collection.item",
  });

  const items = data.records
    .map((record) => record.value)
    .filter((d) => BlueMojiCollectionItem.isRecord(d));

  return {
    items,
    cursor: data.cursor,
  };
};
