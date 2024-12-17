import { useInfiniteQuery } from "@tanstack/react-query";

export type options = { type: string; did: string | null };

export const useTimeline = (options: options) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["timeline"],
    queryFn: async ({ pageParam }) => {
      let endpoint;

      if (pageParam) {
        endpoint =
          options.type === "home"
            ? `/api/timeline?cursor=${pageParam}`
            : `/api/timeline?cursor=${pageParam}&did=${options.did}`;
      } else {
        endpoint =
          options.type === "home"
            ? `/api/timeline`
            : `/api/timeline?did=${options.did}`;
      }

      const res = await fetch(endpoint);
      const json = await res.json();

      return json;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  return { data, fetchNextPage, hasNextPage };
};
