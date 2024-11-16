import { IdResolver } from "@atproto/identity";
import { Firehose } from "@atproto/sync";

export function createFirehose(idResolver: IdResolver) {
  return new Firehose({
    idResolver,
    handleEvent: async (evt) => {
      if (evt.event === "create" || evt.event === "update") {
        const record = evt.record;

        if (evt.collection === "app.bsky.feed.post") {
          console.log(record);
        }
      }
    },
    onError: (err) => {
      console.error({ err }, "error on firehose ingestion");
    },
    filterCollections: ["app.bsky.feed.post"],
    excludeIdentity: true,
    excludeAccount: true,
  });
}
