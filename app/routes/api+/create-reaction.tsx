import { Agent } from "@atproto/api";
import { ActionFunction, json } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { TID } from "@atproto/common";

interface ReactionRequest {
  subject: {
    uri: string;
    cid: string;
  };
  emoji: string;
}

//リアクションの作成
export const action: ActionFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return json(null);

  const body = (await request.json()) as ReactionRequest;

  const rkey = TID.nextStr();

  //リアクションレコード
  const record = {
    $type: "com.marukun-dev.pds.reaction",
    subject: {
      uri: body.subject.uri,
      cid: body.subject.cid,
    },
    createdAt: new Date().toISOString(),
    emoji: body.emoji,
  };

  await agent.com.atproto.repo.putRecord({
    repo: agent.assertDid,
    collection: "com.marukun-dev.pds.reaction",
    rkey,
    record,
    validate: false,
  });

  return json({ ok: true });
};
