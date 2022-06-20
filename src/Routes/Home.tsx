import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getLatestMovies,
  getMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMoviesResult,
  IMovie,
} from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import Sliders from "../components/Sliders";
import MovieModal from "../components/MovieModal";
import StyledTitle from "../components/common/styled/StyledTitle";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [movieId, setMovieId] = useState<number | null>(null);
  const { data: latestMovie, isLoading: latestMoviesLoading } =
    useQuery<IMovie>(["movies", "latestMovie"], getLatestMovies);

  const { data: nowPlayingMovies, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);

  const { data: topRatedMovies, isLoading: topRatedMoviesLoading } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRatedMovies);

  const { data: upcomingMovies, isLoading: upcomingMoviesLoading } =
    useQuery<IGetMoviesResult>(["movies", "upcomingMovies"], getUpcomingMovies);

  const closeModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Wrapper>
      {nowPlayingLoading ||
      latestMoviesLoading ||
      topRatedMoviesLoading ||
      upcomingMoviesLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner $bgPhoto={makeImagePath(latestMovie?.backdrop_path || "")}>
            <StyledTitle>Latest Movie</StyledTitle>
            <Title>{latestMovie?.title}</Title>
            <Overview>{latestMovie?.overview}</Overview>
          </Banner>
          <Sliders
            title="Now Playing Movies >"
            data={nowPlayingMovies}
            openModal={() => setIsOpen(true)}
            setMovieId={setMovieId}
          />
          <Sliders
            title="Top Rated Movies >"
            data={topRatedMovies}
            openModal={() => setIsOpen(true)}
            setMovieId={setMovieId}
          />
          <Sliders
            title="Upcoming Movies >"
            data={upcomingMovies}
            openModal={() => setIsOpen(true)}
            setMovieId={setMovieId}
          />
          {isOpen && (
            <MovieModal
              data={nowPlayingMovies?.results}
              closeModal={closeModal}
              movieId={movieId}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

export default Home;
