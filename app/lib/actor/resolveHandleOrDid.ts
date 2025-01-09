import { Agent } from "@atproto/api";
import { isDid } from "@atproto/oauth-client-node";

export async function resolveHandleOrDid(actor: string, agent: Agent) {
  try {
    if (isDid(actor)) {
      const profile = await agent.getProfile({ actor: actor });

      return { profile, did: actor };
    }

    const did = await agent.com.atproto.identity.resolveHandle({
      handle: actor,
    });

    const profile = await agent.getProfile({ actor: did.data.did });

    return { profile, did: did.data.did };
  } catch (e) {
    return { error: "ユーザーが見つかりませんでした。" };
  }
}
