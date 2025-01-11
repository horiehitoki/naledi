import { useInfiniteQuery } from "@tanstack/react-query";

export const useFollow = (did: string) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["follow"],
      queryFn: async ({ pageParam }) => {
        let endpoint;

        if (pageParam) {
          endpoint = `/api/follow?cursor=${pageParam}&did=${did}`;
        } else {
          endpoint = `/api/follow?did=${did}`;
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

export const useFollower = (did: string) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["follower"],
      queryFn: async ({ pageParam }) => {
        let endpoint;

        if (pageParam) {
          endpoint = `/api/follower?cursor=${pageParam}&did=${did}`;
        } else {
          endpoint = `/api/follower?did=${did}`;
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
