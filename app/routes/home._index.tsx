import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DataWithCursor } from "@types";
import SNSTimeline from "~/components/timeline/timeline";
import { getSessionAgent } from "~/utils/auth/session";
import { ReactionAgent } from "~/utils/reactions/reactionAgent";

export const loader: LoaderFunction = async ({
  request,
}): Promise<DataWithCursor | null> => {
  const agent = await getSessionAgent(request);
  if (!agent) return null;
  const reactionAgent = new ReactionAgent(agent);

  const timeline = await agent.getTimeline({
    limit: 20,
  });

  //タイムラインからリアクション情報を取得
  const data = await reactionAgent.getReactions({
    posts: timeline.data.feed,
  });

  return { data, cursor: timeline.data.cursor };
};

export default function Timeline() {
  const data = useLoaderData<DataWithCursor>();

  return <SNSTimeline initialData={data} />;
}
