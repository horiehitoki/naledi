import { Jetstream } from "@skyware/jetstream";
import { prisma } from "../db/prisma";
import WebSocket from "ws";
import { Record } from "~/generated/api/types/app/netlify/stellarbsky/reaction";

export const jetstream = new Jetstream({
  ws: WebSocket,
  wantedCollections: ["app.netlify.stellarbsky.reaction"],
});

jetstream.onCreate("app.netlify.stellarbsky.reaction", async (event) => {
  console.log(`New Reaction: ${event.commit.record}`);

  const record = event.commit.record as unknown as Record;

  //DBの更新
  await prisma.reaction.upsert({
    where: {
      id: event.commit.rkey,
    },
    update: {
      emoji: record.emoji,
    },
    create: {
      id: event.commit.rkey,
      uri: record.subject.uri,
      cid: record.subject.cid,
      emoji: record.emoji,
      authorDid: record.authorDid,
    },
  });
});

jetstream.onUpdate("app.netlify.stellarbsky.reaction", async (event) => {
  console.log(`Updated Reaction: ${event.commit.record}`);

  const record = event.commit.record as unknown as Record;

  //DBの更新
  await prisma.reaction.upsert({
    where: {
      id: event.commit.rkey,
    },
    update: {
      id: event.commit.rkey,
      emoji: record.emoji,
    },
    create: {
      id: event.commit.rkey,
      uri: record.subject.uri,
      cid: record.subject.cid,
      emoji: record.emoji,
      authorDid: record.authorDid,
    },
  });
});

jetstream.onDelete("app.netlify.stellarbsky.reaction", async (event) => {
  console.log(`Deleted Reaction: ${event.commit.rkey}`);

  await prisma.reaction.delete({
    where: { id: event.commit.rkey },
  });
});
