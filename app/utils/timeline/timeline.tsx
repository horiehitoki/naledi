import { Agent } from "@atproto/api";

export const getTimelineFeed = async (
  agent: Agent,
  params?: { limit?: number }
) => {
  const timeline = await agent.getTimeline({
    limit: params?.limit || 50,
  });

  return {
    feed: timeline.data.feed,
    cursor: timeline.data.cursor,
  };
};
