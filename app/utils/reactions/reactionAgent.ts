import { Agent } from "@atproto/api";
import { PostData } from "@types";
import { AppVercelStellarbskyNS } from "~/generated/api";
import { FeedViewPost } from "~/generated/api/types/app/bsky/feed/defs";
import { prisma } from "../db/prisma";
import { Reaction } from "@prisma/client";

export class ReactionAgent extends Agent {
  agent: AppVercelStellarbskyNS;

  constructor(options: ConstructorParameters<typeof Agent>[0]) {
    super(options);
    this.agent = new AppVercelStellarbskyNS(this);
  }

  async getReactions(params: { posts: FeedViewPost[] }) {
    //投稿データとリアクションデータをセットで返す
    const data: PostData[] = await Promise.all(
      params.posts.map(async (post: FeedViewPost) => {
        const reactions: Reaction[] = await prisma.reaction.findMany({
          where: {
            uri: post.post.uri,
          },
        });

        //リアクションしたユーザーの情報を追加
        const result = await Promise.all(
          reactions.map(async (reaction) => {
            const authorProfile = await this.getProfile({
              actor: reaction.createdBy,
            });

            return {
              reaction,
              author: authorProfile.data,
            };
          })
        );

        return {
          post,
          reaction: result,
        };
      })
    );

    return data;
  }

  async put(params: {
    rkey: string;
    subject: {
      uri: string;
      cid: string;
    };
    emoji: string;
  }) {
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
      rkey: params.rkey,
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
