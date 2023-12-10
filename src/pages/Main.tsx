import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovieList } from "../api";
import { Box, Button, Container, TextField, styled } from "@mui/material";
import Header from "../components/Header";
import { useObserver } from "../hooks/useObserver";
import { ListResultType } from "../types/types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const InputWrap = styled(Box)`
  background-color: white;
  padding: 20px;
`;

const Main = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const { data: listData, fetchNextPage } = useInfiniteQuery({
    queryKey: ["get-movie-list"],
    queryFn: ({ pageParam }) => getMovieList(pageParam),
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

  const onClickSearch = () => {
    navigate("/search", {
      state: { searchInput: searchInput === null ? "" : searchInput },
    });
  };

  const path = "https://image.tmdb.org/t/p/original";

  return (
    <Container sx={{ paddingTop: "60px" }}>
      <Header />
      <InputWrap
        width="100%"
        display="flex"
        gap="8px"
        position="sticky"
        top="40px"
        zIndex={1900}
      >
        <TextField
          id="outlined-basic"
          label="검색"
          variant="outlined"
          fullWidth
          size="small"
          placeholder="영화를 검색하세요."
          value={searchInput}
          onChange={onChangeInput}
        />
        <Button variant="contained" onClick={onClickSearch}>
          검색
        </Button>
      </InputWrap>
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        gap="20px"
        marginTop="20px"
        marginBottom="20px"
      >
        {listData?.pages?.map((page) => {
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

export default Main;
