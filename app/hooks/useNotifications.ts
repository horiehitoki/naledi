import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useNotifications = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: async ({ pageParam }) => {
        const endpoint = pageParam
          ? `/api/notifications?cursor=${pageParam}`
          : "/api/notifications";
        const res = await fetch(endpoint);
        const json = await res.json();
        return json;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.cursor,
    });

  return { data, fetchNextPage, hasNextPage, isLoading, isError };
};

export const useUnreadNotifications = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["unread"],
    queryFn: async () => {
      const res = await fetch("/api/unread");

      const data = await res.json();

      return data;
    },
    refetchInterval: 20000,
  });

  return { data, isLoading, isError };
};
