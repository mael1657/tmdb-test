import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFavoriteMovieList } from "../api";
import { useObserver } from "../hooks/useObserver";
import { ListResultType } from "../types/types";
import MovieCard from "../components/MovieCard";

const Favorite = () => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["favorite-list"],
    queryFn: ({ pageParam }) => getFavoriteMovieList(pageParam),
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
  });

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  const path = "https://image.tmdb.org/t/p/original";

  return (
    <Container sx={{ paddingTop: "60px" }}>
      <Header />
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        gap="20px"
        marginTop="20px"
        marginBottom="20px"
      >
        {data?.pages?.map((page) => {
          const movieList: ListResultType[] = page.data.results;
          return movieList.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                poster={path + movie.poster_path}
                title={movie.title}
                release={movie.release_date}
                overview={movie.overview}
                vote={movie.vote_average}
                id={movie.id}
              />
            );
          });
        })}
      </Box>
      <div ref={setTarget} />
    </Container>
  );
};

export default Favorite;
