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
import Banner from "../components/Banner";
import Loader from "../components/common/styled/Loader";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [movieId, setMovieId] = useState<number | null>(null);

  const { data: nowPlayingMovies, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);

  const { data: topRatedMovies, isLoading: topRatedMoviesLoading } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRatedMovies);

  const { data: upcomingMovies, isLoading: upcomingMoviesLoading } =
    useQuery<IGetMoviesResult>(["movies", "upcomingMovies"], getUpcomingMovies);

  const closeModal = () => {
    setIsOpen((prev) => !prev);
  };

  const movieSlides = [
    { title: "Now Playing Movies >", data: nowPlayingMovies },
    { title: "Top Rated Movies >", data: topRatedMovies },
    { title: "Upcoming Movies >", data: upcomingMovies },
  ];

  return (
    <Wrapper>
      {nowPlayingLoading || topRatedMoviesLoading || upcomingMoviesLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner />
          {movieSlides.map((movie) => (
            <Sliders
              title={movie.title}
              data={movie.data}
              openModal={() => setIsOpen(true)}
              setMovieId={setMovieId}
            />
          ))}
          {isOpen && <MovieModal closeModal={closeModal} movieId={movieId} />}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

export default Home;
