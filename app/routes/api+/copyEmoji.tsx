import { Agent } from "@atproto/api";
import { DidDocument } from "@atproto/identity";
import type { ActionFunction } from "@remix-run/node";
import { BlueMojiCollectionItem } from "~/generated/api";
import { getSessionAgent } from "~/lib/auth/session";
import { createIdResolver, getServiceEndpoint } from "~/lib/resolver";

export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return new Response(null, { status: 401 });

  switch (request.method) {
    case "POST": {
      try {
        const body = await request.json();

        //didの解決
        const resolver = createIdResolver();
        const didDoc = await resolver.did.resolve(body.repo);

        //コピー元ユーザーのPDSを取得
        const serviceUrl = getServiceEndpoint(didDoc as DidDocument);

        //コピー元ユーザーのagentを生成
        const service = new Agent(serviceUrl!);

        const { data: originalData } = await service.com.atproto.repo.getRecord(
          {
            collection: "blue.moji.collection.item",
            repo: body.repo,
            rkey: body.rkey,
          }
        );

        if (!originalData) {
          return new Response(
            JSON.stringify({ error: "コピー元の絵文字が見つかりません。" }),
            {
              status: 500,
            }
          );
        }

        const originalRecord = originalData.value;

        if (!BlueMojiCollectionItem.isRecord(originalRecord)) {
          return new Response(
            JSON.stringify({ error: "絵文字のレコードが不正です。" }),
            {
              status: 500,
            }
          );
        }

        const blob = await service.com.atproto.sync.getBlob({
          did: body.repo,
          cid: originalRecord.formats.png_128!.ref,
        });

        const { data } = await agent.com.atproto.repo.uploadBlob(blob.data, {
          encoding: "image/png",
        });

        const record: BlueMojiCollectionItem.Record = {
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
          return new Response(
            JSON.stringify({ error: "絵文字のレコードが不正です。" }),
            {
              status: 500,
            }
          );
        }

        await agent.com.atproto.repo.putRecord({
          repo: agent.assertDid,
          collection: "blue.moji.collection.item",
          rkey: body.rkey,
          record,
        });

        return Response.json({ ok: true });
      } catch (e) {
        console.log(e);

        return new Response(
          JSON.stringify({ error: "リアクションのコピーに失敗しました。" }),
          {
            status: 500,
          }
        );
      }
    }
  }
};
