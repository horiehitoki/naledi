import { XrpcClient } from "@atproto/xrpc";
import { schemaDict } from "~/generated/api/lexicons";
import { schemaDict as atpDict } from "@atproto/api/dist/client/lexicons";

export class ReactionXrpc {
  stellarXrpc: XrpcClient;

  constructor() {
    this.stellarXrpc = new XrpcClient("http://localhost:5173", [
      schemaDict.ComAtprotoRepoStrongRef,
      schemaDict.BlueMojiCollectionItem,
      schemaDict.BlueMarilStellarGetActorReactions,
      schemaDict.BlueMarilStellarGetReactions,
      schemaDict.BlueMarilStellarReaction,
      atpDict.AppBskyActorDefs,
      atpDict.AppBskyFeedDefs,
    ]);
  }

  async getReactions(
    uri: string,
    cid: string,
    limit: number,
    cursor?: string | null
  ) {
    const params: { uri: string; cid: string; limit: number; cursor?: string } =
      {
        uri,
        cid,
        limit,
      };

    if (cursor !== null && cursor !== undefined) {
      params.cursor = cursor;
    }

    return await this.stellarXrpc.call(
      "blue.maril.stellar.getReactions",
      params
    );
  }

  async getActorReaction(actor: string, limit: number, cursor?: string | null) {
    const params: { actor: string; limit: number; cursor?: string } = {
      actor,
      limit,
    };

    if (cursor !== null && cursor !== undefined) {
      params.cursor = cursor;
    }

    return await this.stellarXrpc.call(
      "blue.maril.stellar.getActorReactions",
      params
    );
  }
}
