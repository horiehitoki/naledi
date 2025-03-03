import { BlueMojiCollectionItem } from "../../../../types/atmosphere";
import { AtpAgent, CredentialSession } from "@atproto/api";
import { createIdResolver, getServiceEndpoint } from "../resolver";
import { DidDocument } from "@atproto/identity";

//TODO 絵文字コピー機能の実装
export async function copyEmoji(agent: AtpAgent, rkey: string, repo: string) {
  const resolver = createIdResolver();

  //didの解決
  const didDoc = await resolver.did.resolve(repo);

  //コピー元ユーザーのPDSを取得
  const serviceUrl = getServiceEndpoint(didDoc as DidDocument);

  //agentを生成
  const service = new AtpAgent(new CredentialSession(new URL(serviceUrl!)));

  const { data: originalData } = await service.com.atproto.repo.getRecord({
    collection: "blue.moji.collection.item",
    repo,
    rkey,
  });

  if (!originalData) {
    throw Error("コピー元の絵文字が見つかりません。");
  }

  const originalRecord = originalData.value;

  if (!BlueMojiCollectionItem.isRecord(originalRecord)) {
    throw Error("絵文字のレコードが不正です。");
  }

  const blob = await service.com.atproto.sync.getBlob({
    did: repo,
    //@ts-ignore
    cid: originalRecord.formats.png_128!.ref,
  });

  const { data } = await agent.com.atproto.repo.uploadBlob(blob.data, {
    encoding: "image/png",
  });

  const record = {
    $type: "blue.moji.collection.item",
    name: originalRecord.name,
    alt: originalRecord.alt,
    formats: {
      $type: "blue.moji.collection.item#formats_v0",
      png_128: data.blob,
    },
    copyOf: originalData.uri,
    createdAt: new Date().toISOString(),
  };

  if (
    !BlueMojiCollectionItem.isRecord(record) &&
    !BlueMojiCollectionItem.validateRecord(record)
  ) {
    throw Error("絵文字のレコードが不正です。");
  }

  await agent.com.atproto.repo.putRecord({
    repo: agent.assertDid,
    collection: "blue.moji.collection.item",
    rkey: rkey,
    record,
  });
}
