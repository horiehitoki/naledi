import { Agent, CredentialSession } from "@atproto/api";
import { TID } from "@atproto/common";
import {
  ComMarukunDevStellarNS,
  ComMarukunDevStellarReaction,
} from "~/generated/api";
import { XrpcClient } from "@atproto/xrpc";
import { schemaDict } from "~/generated/api/lexicons";
import { schemaDict as atpDict } from "@atproto/api/dist/client/lexicons";

export class ReactionAgent extends Agent {
  agent: ComMarukunDevStellarNS;
  stellarXrpc: XrpcClient;

  constructor(options: ConstructorParameters<typeof Agent>[0]) {
    super(options);
    this.agent = new ComMarukunDevStellarNS(this);

    this.stellarXrpc = new XrpcClient("https://stellar.marukun-dev.com", [
      schemaDict.ComAtprotoRepoStrongRef,
      schemaDict["ComMarukun-devStellarReaction"],
      schemaDict.BlueMojiCollectionItem,
      atpDict.AppBskyActorDefs,
    ]);
  }

  static credential(serviceUrl: string = "https://public.api.bsky.app") {
    const session = new CredentialSession(new URL(serviceUrl));
    return new ReactionAgent(session);
  }

  async get(uri: string, cid: string, limit: number) {
    return await this.stellarXrpc.call("com.marukun-dev.stellar.getReaction", {
      uri,
      cid,
      limit,
    });
  }

  async put(record: ComMarukunDevStellarReaction.Record) {
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
  }

  async delete(rkey: string) {
    return await this.com.atproto.repo.deleteRecord({
      collection: "com.marukun-dev.stellar.reaction",
      repo: this.assertDid,
      rkey: rkey,
    });
  }
}
