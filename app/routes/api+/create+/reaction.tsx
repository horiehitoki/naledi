import { Agent } from "@atproto/api";
import { TID } from "@atproto/common";
import { ActionFunction, json } from "@remix-run/node";
import { getSessionAgent } from "~/utils/auth/session";
import { prisma } from "~/utils/db/prisma";
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

  //すでにリアクションを行っているかチェック
  const prevReaction = await prisma.reaction.findUnique({
    where: {
      uri_createdBy: {
        uri: body.subject.uri,
        createdBy: agent.assertDid,
      },
    },
  });

  if (prevReaction) {
    //楽観的更新
    await prisma.reaction.update({
      where: {
        uri_createdBy: {
          uri: body.subject.uri,
          createdBy: agent.assertDid,
        },
      },
      data: {
        emoji: body.emoji,
      },
    });

    //PDS側も更新
    await reactionAgent.put({
      rkey: prevReaction.id,
      subject: {
        uri: body.subject.uri,
        cid: body.subject.cid,
      },
      emoji: body.emoji,
    });

    return json({ ok: true });
  } else {
    //新規にレコードを作成
    const rkey = TID.nextStr();

    //楽観的更新
    await prisma.reaction.create({
      data: {
        id: rkey,
        uri: body.subject.uri,
        cid: body.subject.cid,
        emoji: body.emoji,
        createdBy: agent.assertDid,
      },
    });

    await reactionAgent.put({
      rkey: rkey,
      subject: {
        uri: body.subject.uri,
        cid: body.subject.cid,
      },
      emoji: body.emoji,
    });

    return json({ ok: true });
  }
};
