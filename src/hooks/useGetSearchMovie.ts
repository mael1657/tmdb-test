import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchMovies } from "../api";

// export const useGetSearchMovie = (page: number) => {
//   return useQuery({
//     queryKey: ["search-movie"],
//     queryFn: () => getSearchMovies(page),
//     enabled: false,
//   });
// };

export const useGetSearchMovie = (title: string) => {
  return useInfiniteQuery({
    queryKey: ["search-movie"],
    queryFn: ({ pageParam }) => getSearchMovies(pageParam, title),
    initialPageParam: 1,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
    }),
    getNextPageParam: (lastPage) => {
      const page = lastPage.data.page;
      if (lastPage.data.total_pages == page) return null;
      return page + 1;
    },
    enabled: false,
  });
};
