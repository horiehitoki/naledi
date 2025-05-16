"use client";
import { useAgent } from "@/app/providers/agent";
import { getSavedFeeds } from "@/lib/api/bsky/feed";
import { useQuery } from "@tanstack/react-query";
import FeedContainer from "../posts/FeedContainer";
import { useClientModeState } from "@/state/client";
import ColumnContainer from "../column/ColumnContainer";

export default function DashboardContainer() {
  const agent = useAgent();
  const mode = useClientModeState();
  const { data: savedFeeds, isFetching } = useQuery({
    queryKey: ["savedFeeds"],
    queryFn: async () => getSavedFeeds(agent),
  });

  if (mode === "Default") {
    return <FeedContainer feed="timeline" mode="feed" />;
  }

  if (mode === "Deck") {
    return (
      <div className="flex w-full h-screen overflow-x-auto">
        <ColumnContainer id={"home"} title="Home">
          <FeedContainer feed="timeline" mode="feed" column="home" />
        </ColumnContainer>

        {!isFetching &&
          savedFeeds
            ?.filter((feed) => feed.pinned)
            .map((feed, index) => (
              <ColumnContainer
                id={index.toString()}
                key={feed.did}
                title={feed.displayName}
              >
                <FeedContainer
                  feed={feed.uri}
                  mode="feed"
                  column={index.toString()}
                />
              </ColumnContainer>
            ))}
      </div>
    );
  }
}
