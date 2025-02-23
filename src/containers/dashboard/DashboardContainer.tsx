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

  if (mode === "default") {
    return <FeedContainer feed="timeline" mode="feed" />;
  }

  if (mode === "deck") {
    return (
      <div className="flex h-screen w-full overflow-x-auto">
        <ColumnContainer title="Home">
          <FeedContainer feed="timeline" mode="feed" />
        </ColumnContainer>

        {!isFetching &&
          savedFeeds
            ?.filter((feed) => feed.pinned)
            .map((feed) => (
              <ColumnContainer key={feed.did} title={feed.displayName}>
                <FeedContainer feed={feed.uri} mode="feed" />
              </ColumnContainer>
            ))}
      </div>
    );
  }
}
