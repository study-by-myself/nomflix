const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetTVResult {
  page: number;
  results: ITV[];
  total_pages: number;
  total_results: number;
}

export interface ITV {
  id: number;
  first_air_date: string;
  genre_ids: number[];
  name: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  original_language: string;
}

export interface ISearch {
  id: number;
  name: string;
}

export interface IGetSearchResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getLatestMovies() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieDetail(movie_id: number | null) {
  console.log(movie_id);
  return fetch(`${BASE_PATH}/movie/${movie_id}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMoviesBySearch(keyword: string | undefined) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}

export function getTvs() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
