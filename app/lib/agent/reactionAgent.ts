import { Agent, CredentialSession } from "@atproto/api";
import { TID } from "@atproto/common";
import {
  ComMarukunDevStellarNS,
  ComMarukunDevStellarReaction,
} from "~/generated/api";

export class ReactionAgent extends Agent {
  agent: ComMarukunDevStellarNS;

  constructor(options: ConstructorParameters<typeof Agent>[0]) {
    super(options);
    this.agent = new ComMarukunDevStellarNS(this);
  }

  static credential(serviceUrl: string = "https://public.api.bsky.app") {
    const session = new CredentialSession(new URL(serviceUrl));
    return new ReactionAgent(session);
  }

  //なぜか LexiconDefNotFoundError: Lexicon not found: com.marukun-dev.stellar.getReaction になる
  async get(uri: string, cid: string, limit: number) {
    try {
      return this.agent.getReaction({ uri, cid, limit });
    } catch (e) {
      console.log(e);
      throw new Error("絵文字リアクションの取得に失敗しました。");
    }
  }

  async put(record: ComMarukunDevStellarReaction.Record) {
    try {
      if (
        !ComMarukunDevStellarReaction.isRecord(record) &&
        !ComMarukunDevStellarReaction.validateRecord(record)
      )
        return new Response(null, { status: 400 });

      const rkey = TID.nextStr();

      await this.com.atproto.repo.putRecord({
        collection: "com.marukun-dev.stellar.reaction",
        repo: this.assertDid,
        rkey: rkey,
        record: record,
      });

      return rkey;
    } catch (e) {
      console.error(e);

      throw new Error("絵文字リアクションに失敗しました。");
    }
  }

  async delete(rkey: string) {
    try {
      return await this.com.atproto.repo.deleteRecord({
        collection: "com.marukun-dev.stellar.reaction",
        repo: this.assertDid,
        rkey: rkey,
      });
    } catch (e) {
      console.error(e);
      throw new Error("絵文字リアクションの解除に失敗しました。");
    }
  }
}
