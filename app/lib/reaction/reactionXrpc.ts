import { XrpcClient } from "@atproto/xrpc";
import { lexicons } from "~/generated/api/lexicons";

export class ReactionXrpc {
  stellarXrpc: XrpcClient;

  constructor() {
    this.stellarXrpc = new XrpcClient("http://localhost:5173", lexicons);
  }

  async getReactions(
    uri: string,
    cid: string,
    limit: number,
    cursor?: string | null
  ) {
    try {
      const params: {
        uri: string;
        cid: string;
        limit: number;
        cursor?: string;
      } = {
        uri,
        cid,
        limit,
      };

      if (cursor !== null && cursor !== undefined) {
        params.cursor = cursor;
      }

      const res = await fetch(
        `http://localhost:5173/xrpc/blue.maril.stellar.getReactions?uri=${
          params.uri
        }&cid=${params.cid}&limit=${params.limit}${
          params.cursor ? `&cursor=${params.cursor}` : ""
        }`
      );

      const json = await res.json();

      return { data: json };

      /*
      xrpc.callするとバリデーションエラーが出るのでいったん保留
      return await this.stellarXrpc.call(
        "blue.maril.stellar.getReactions",
        params
      );*/
    } catch (e) {
      console.log(e);
      return { data: [] };
    }
  }

  async getActorReaction(actor: string, limit: number, cursor?: string | null) {
    try {
      const params: { actor: string; limit: number; cursor?: string } = {
        actor,
        limit,
      };

      if (cursor !== null && cursor !== undefined) {
        params.cursor = cursor;
      }

      const res = await fetch(
        `http://localhost:5173/xrpc/blue.maril.stellar.getActorReactions?actor=${
          params.actor
        }&limit=${params.limit}${
          params.cursor ? `&cursor=${params.cursor}` : ""
        }`
      );

      const json = await res.json();

      return { data: json };

      /*
      return await this.stellarXrpc.call(
        "blue.maril.stellar.getActorReactions",
        params
      );*/
    } catch (e) {
      console.log(e);

      return { data: [] };
    }
  }
}
