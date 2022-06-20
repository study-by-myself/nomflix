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

export function getMoviesBySearch(keyword: string | undefined) {
  return fetch(
    `${BASE_PATH}/search/keyword?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}
