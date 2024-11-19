import { IdResolver } from "@atproto/identity";
import { Firehose } from "@atproto/sync";
import { prisma } from "./db/prisma";
import { isRecord } from "~/generated/api/types/com/marukun-dev/pds/reaction";
import { validateRecord } from "~/generated/api/types/com/marukun-dev/pds/reaction";

export function createFirehose(idResolver: IdResolver) {
  return new Firehose({
    idResolver,
    handleEvent: async (evt) => {
      if (evt.event === "create" || evt.event === "update") {
        if (
          evt.collection === "com.marukun-dev.pds.reaction" &&
          isRecord(evt.record) &&
          validateRecord(evt.record).success
        ) {
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
        if (evt.collection === "com.marukun-dev.pds.reaction") {
          await prisma.reaction.delete({
            where: { id: evt.rkey },
          });
        }
      }
    },
    onError: (err) => {
      null;
    },
    filterCollections: ["com.marukun-dev.pds.reaction"],
    excludeIdentity: true,
    excludeAccount: true,
  });
}
