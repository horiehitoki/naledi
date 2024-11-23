import { Agent } from "@atproto/api";
import { ActionFunction, json } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { ReactionAgent } from "~/utils/reactions/reactionAgent";

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

  const reactionAgent = new ReactionAgent(agent);

  const res = await reactionAgent.put({
    subject: {
      uri: body.subject.uri,
      cid: body.subject.cid,
    },
    emoji: body.emoji,
  });

  return json(res ? { ok: true } : { ok: false });
};
