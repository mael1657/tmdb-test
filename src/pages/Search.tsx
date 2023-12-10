import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { useGetSearchMovie } from "../hooks/useGetSearchMovie";
import { useObserver } from "../hooks/useObserver";
import { ListResultType } from "../types/types";

import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

const InputWrap = styled(Box)`
  background-color: white;
  padding: 20px;
`;

const Search = () => {
  const location = useLocation();
  const input = location.state;

  const [searchInput, setSearchInput] = useState(
    input === null ? "" : input.searchInput
  );

  useEffect(() => {
    if (input === null) return;
    refetch();
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    isIntersecting && fetchNextSearch();
  };

  const { setTarget } = useObserver({ onIntersect });

  const {
    refetch,
    data: searchData,
    isFetched: isSearchFetched,
    fetchNextPage: fetchNextSearch,
  } = useGetSearchMovie(searchInput);

  const onClickSearch = () => {
    refetch();
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
      {searchData && searchData.pages[0].data.total_results === 0 && (
        <Box
          width="100%"
          height="50vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>검색 결과가 없습니다.</Typography>
        </Box>
      )}
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        gap="20px"
        marginTop="20px"
        marginBottom="20px"
      >
        {isSearchFetched &&
          searchData?.pages.map((page) => {
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

export default Search;
