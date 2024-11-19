import { Agent } from "@atproto/api";
import { ActionFunction, json } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { TID } from "@atproto/common";
import { prisma } from "~/utils/db/prisma";
import { isRecord } from "~/generated/api/types/com/marukun-dev/pds/reaction";
import { validateRecord } from "~/generated/api/types/com/marukun-dev/pds/reaction";

interface ReactionRequest {
  subject: {
    uri: string;
    cid: string;
  };
  emoji: string;
  postedBy: string;
}

//リアクションの作成
export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const body = (await request.json()) as ReactionRequest;

  const rkey = TID.nextStr();

  //楽観的更新
  await prisma.reaction.upsert({
    where: {
      uri_createdBy: {
        uri: body.subject.uri,
        createdBy: body.postedBy,
      },
    },
    update: {
      id: rkey,
      emoji: body.emoji,
    },
    create: {
      id: rkey,
      uri: body.subject.uri,
      cid: body.subject.cid,
      emoji: body.emoji,
      createdBy: body.postedBy,
    },
  });

  //リアクションレコード
  const record = {
    $type: "com.marukun-dev.pds.reaction",
    subject: {
      uri: body.subject.uri,
      cid: body.subject.cid,
    },
    createdAt: new Date().toISOString(),
    emoji: body.emoji,
    postedBy: body.postedBy,
  };

  //バリデーション
  if (!isRecord(record) && !validateRecord(record).success) {
    return json({ ok: false });
  }

  await agent.com.atproto.repo.putRecord({
    repo: agent.assertDid,
    collection: "com.marukun-dev.pds.reaction",
    rkey,
    record,
  });

  return json({ ok: true });
};
