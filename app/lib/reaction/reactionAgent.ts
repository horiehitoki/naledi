import { Agent, CredentialSession } from "@atproto/api";
import { TID } from "@atproto/common";
import { BlueMarilStellarNS, BlueMarilStellarReaction } from "~/generated/api";

export class ReactionAgent extends Agent {
  agent: BlueMarilStellarNS;

  constructor(options: ConstructorParameters<typeof Agent>[0]) {
    super(options);
    this.agent = new BlueMarilStellarNS(this);
  }

  static credential(serviceUrl: string = "https://public.api.bsky.app") {
    const session = new CredentialSession(new URL(serviceUrl));
    return new ReactionAgent(session);
  }

  async put(record: BlueMarilStellarReaction.Record) {
    if (
      !BlueMarilStellarReaction.isRecord(record) &&
      !BlueMarilStellarReaction.validateRecord(record)
    )
      return new Response(null, { status: 400 });

    const rkey = TID.nextStr();

    await this.com.atproto.repo.putRecord({
      collection: "blue.maril.stellar.reaction",
      repo: this.assertDid,
      rkey: rkey,
      record: record,
    });

    return rkey;
  }

  async delete(rkey: string) {
    return await this.com.atproto.repo.deleteRecord({
      collection: "blue.maril.stellar.reaction",
      repo: this.assertDid,
      rkey: rkey,
    });
  }
}
