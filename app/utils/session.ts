import { getIronSession, IronSession } from "iron-session";
import { Agent } from "@atproto/api";
import { client } from "~/utils/auth/client";
import { Session } from "@types";

export async function getSessionAgent(req: Request): Promise<Agent | null> {
  const response = new Response();

  const session: IronSession<Session> = await getIronSession<Session>(
    req,
    response,
    {
      cookieName: "sid",
      password: process.env.SESSION_SECRET!,
    }
  );

  if (!session.did) return null;
  try {
    const oauthSession = await client.restore(session.did);
    return oauthSession ? new Agent(oauthSession) : null;
  } catch (err) {
    console.warn({ err }, "oauth restore failed");
    await session.destroy();
    return null;
  }
}
