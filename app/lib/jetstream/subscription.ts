import { Jetstream } from "@skyware/jetstream";
import { prisma } from "../db/prisma";
import WebSocket from "ws";
import { Record } from "~/generated/api/types/app/netlify/stellarbsky/reaction";

export const jetstream = new Jetstream({
  ws: WebSocket,
  wantedCollections: ["app.netlify.stellarbsky.reaction"],
});

jetstream.onCreate("app.netlify.stellarbsky.reaction", async (event) => {
  console.log(`New post: ${event.commit.record}`);

  const record = event.commit.record as unknown as Record;

  //DBの更新
  await prisma.reaction.upsert({
    where: {
      uri_authorDid: {
        uri: record.subject.uri,
        authorDid: record.authorDid,
      },
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

jetstream.onUpdate("app.netlify.stellarbsky.reaction", async (event) => {
  console.log(`Updated post: ${event.commit.record}`);

  const record = event.commit.record as unknown as Record;

  //DBの更新
  await prisma.reaction.upsert({
    where: {
      uri_authorDid: {
        uri: record.subject.uri,
        authorDid: record.authorDid,
      },
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
  console.log(`Deleted post: ${event.commit.rkey}`);

  await prisma.reaction.delete({
    where: { id: event.commit.rkey },
  });
});
