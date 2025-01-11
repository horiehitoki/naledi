import { useInfiniteQuery } from "@tanstack/react-query";

export type options = {
  type: string;
  did: string | null;
};

export const useTimeline = (options: options) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["timeline"],
      queryFn: async ({ pageParam }) => {
        let endpoint;

        switch (options.type) {
          case "home":
            endpoint = pageParam
              ? `/api/timeline?cursor=${pageParam}`
              : "/api/timeline";
            break;
          case "user":
            endpoint = pageParam
              ? `/api/timeline?cursor=${pageParam}&did=${options.did}`
              : `/api/timeline?did=${options.did}`;
            break;
          default:
            return;
        }

        const res = await fetch(endpoint);

        const feedView = await res.json();

        return feedView;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.cursor,
    });

  return { data, fetchNextPage, hasNextPage, isLoading, isError };
};
