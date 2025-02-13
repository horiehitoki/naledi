export async function getReactions(
  uri: string,
  cid: string,
  limit: number,
  cursor?: string | null
) {
  try {
    const params: {
      uri: string;
      cid: string;
      limit: number;
      cursor?: string;
    } = {
      uri,
      cid,
      limit,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STELLAR_APPVIEW_URL}/xrpc/blue.maril.stellar.getReactions?uri=${
        params.uri
      }&cid=${params.cid}&limit=${params.limit}${
        cursor ? `&cursor=${cursor}` : ""
      }`
    );

    const json = await res.json();

    return { data: json };
  } catch (e) {
    console.log(e);
    return { data: [] };
  }
}

export async function getActorReaction(
  actor: string,
  limit: number,
  cursor?: string | null
) {
  try {
    const params: { actor: string; limit: number; cursor?: string } = {
      actor,
      limit,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STELLAR_APPVIEW_URL}/xrpc/blue.maril.stellar.getActorReactions?actor=${
        params.actor
      }&limit=${params.limit}${cursor ? `&cursor=${cursor}` : ""}`
    );

    const json = await res.json();

    return { data: json };
  } catch (e) {
    console.log(e);

    return { data: [] };
  }
}
