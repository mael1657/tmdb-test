import axios from "axios";
import { GetMovieListResponse, ResponseDataResult } from "../types/types";

const baseURL = import.meta.env.VITE_API_SERVER;

const api = axios.create({
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
  },
  baseURL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: "ko-KR",
  },
});

api.interceptors.response.use((response) => {
  return response;
});

export const getRequestToken = async () => {
  return api.get("/authentication/token/new");
};

export const postCreateSession = async (request_token: string) => {
  return api.post("/authentication/session/new", { request_token });
};

export const getMovieList = async (
  page: number
): Promise<ResponseDataResult<GetMovieListResponse>> => {
  return await api.get(`/movie/popular?language=kr-KR&page=${page}`);
};

export const getSearchMovies = async (
  pageParam: number,
  title: string
): Promise<ResponseDataResult<GetMovieListResponse>> => {
  return await api.get(
    `/search/movie?query=${title}&include_adult=false&language=ko-KR&page=${pageParam}`
  );
};

export const postAddFavorite = async (
  media_type: string,
  media_id: number,
  favorite: boolean
) => {
  return await api.post(`/account/12440223/favorite`, {
    media_type,
    media_id,
    favorite,
  });
};

export const getFavoriteMovieList = async (
  page: number
): Promise<ResponseDataResult<GetMovieListResponse>> => {
  return await api.get(
    `/account/12440223/favorite/movies?language=ko-KR&page=${page}&sort_by=created_at.asc`
  );
};
