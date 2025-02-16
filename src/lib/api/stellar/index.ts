export async function getReactions(
  uri: string,
  cid: string,
  limit: number,
  cursor?: string | null
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STELLAR_APPVIEW_URL}/xrpc/blue.maril.stellar.getReactions?uri=${
        uri
      }&cid=${cid}&limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STELLAR_APPVIEW_URL}/xrpc/blue.maril.stellar.getActorReactions?actor=${
        actor
      }&limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`
    );

    const json = await res.json();

    return { data: json };
  } catch (e) {
    console.log(e);

    return { data: [] };
  }
}

export async function getEmojis(limit: number, cursor?: string | null) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STELLAR_APPVIEW_URL}/xrpc/blue.maril.stellar.getEmojis?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`
    );

    const json = await res.json();

    return { data: json };
  } catch (e) {
    console.log(e);

    return { data: [] };
  }
}
