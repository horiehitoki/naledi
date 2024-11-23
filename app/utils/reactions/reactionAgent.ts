import { Agent } from "@atproto/api";
import { TID } from "@atproto/common";
import { AppVercelStellarbskyNS } from "~/generated/api";

export class ReactionAgent extends Agent {
  agent: AppVercelStellarbskyNS;

  constructor(options: ConstructorParameters<typeof Agent>[0]) {
    super(options);
    this.agent = new AppVercelStellarbskyNS(this);
  }

  async getReactions(params: {
    uri: string;
    cid?: string;
    limit?: number;
    cursor?: string;
  }) {
    return await this.agent.getReactions({
      uri: params.uri,
      cid: params.cid,
      limit: params.limit,
      cursor: params.cursor,
    });
  }

  async put(params: {
    subject: {
      uri: string;
      cid: string;
    };
    emoji: string;
  }) {
    const rkey = TID.nextStr();

    const record = {
      subject: {
        uri: params.subject.uri,
        cid: params.subject.cid,
      },
      createdAt: new Date().toISOString(),
      emoji: params.emoji,
      postedBy: this.assertDid,
    };

    return await this.com.atproto.repo.putRecord({
      repo: this.assertDid,
      collection: "app.vercel.stellarbsky.reaction",
      rkey,
      record,
    });
  }

  async delete(params: { rkey: string }) {
    return await this.agent.reaction.delete({
      rkey: params.rkey,
      repo: this.assertDid,
    });
  }

  async get(params: { rkey: string }) {
    return await this.agent.reaction.get({
      rkey: params.rkey,
      repo: this.assertDid,
    });
  }
}
