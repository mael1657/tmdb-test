export type ResponseDataResult<ResponseData> = {
  status: number;
  data: ResponseData;
};

export type ListResultType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type GetMovieListResponse = {
  page: number;
  results: ListResultType[];
  total_pages: number;
  total_results: number;
};
