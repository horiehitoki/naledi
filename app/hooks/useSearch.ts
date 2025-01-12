import { useInfiniteQuery } from "@tanstack/react-query";

export type options = {
  query: string;
};

export const useSearch = (options: options) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["search"],
      queryFn: async ({ pageParam }) => {
        const endpoint = pageParam
          ? `/api/search?cursor=${pageParam}&query=${encodeURIComponent(
              options.query
            )}`
          : `/api/search?query=${encodeURIComponent(options.query)}`;

        const res = await fetch(endpoint);

        const feedView = await res.json();
        console.log(feedView);

        return feedView;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.cursor,
    });

  return { data, fetchNextPage, hasNextPage, isLoading, isError };
};
