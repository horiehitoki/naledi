import { IdResolver } from "@atproto/identity";
import { Firehose } from "@atproto/sync";
import { prisma } from "./db/prisma";

export function createFirehose(idResolver: IdResolver) {
  return new Firehose({
    idResolver,
    handleEvent: async (evt) => {
      if (evt.event === "create" || evt.event === "update") {
        if (evt.collection === "app.vercel.stellarbsky.reaction") {
          const record = evt.record;

          //DBの更新
          await prisma.reaction.upsert({
            where: {
              uri_createdBy: {
                uri: record.subject.uri,
                createdBy: record.postedBy,
              },
            },
            update: {
              id: evt.rkey,
              emoji: record.emoji,
            },
            create: {
              id: evt.rkey,
              uri: record.subject.uri,
              cid: record.subject.cid,
              emoji: record.emoji,
              createdBy: record.postedBy,
            },
          });
        }
      }
      if (evt.event === "delete") {
        if (evt.collection === "app.vercel.stellarbsky.reaction") {
          await prisma.reaction.delete({
            where: { id: evt.rkey },
          });
        }
      }
    },
    onError: (err) => {
      null;
    },
    filterCollections: ["app.vercel.stellarbsky.reaction"],
    excludeIdentity: true,
    excludeAccount: true,
  });
}
