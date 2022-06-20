import { useQuery } from "react-query";
import {
  getLatestMovies,
  getMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IResults,
  IResult,
  getMovieDetail,
} from "../api";
import { useState } from "react";
import Sliders from "../components/Sliders";
import Banner from "../components/Banner";
import Loader from "../components/common/styled/Loader";
import { Wrapper } from "../components/common/styled/Wrapper";
import ClickedModal from "../components/ClickedModal";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [movieId, setMovieId] = useState<number | null>(null);
  const { data: latestMovie, isLoading: latestMoviesLoading } =
    useQuery<IResult>(["movies", "latestMovie"], getLatestMovies);

  const { data: nowPlayingMovies, isLoading: nowPlayingLoading } =
    useQuery<IResults>(["movies", "nowPlaying"], getMovies);

  const { data: topRatedMovies, isLoading: topRatedMoviesLoading } =
    useQuery<IResults>(["movies", "topRated"], getTopRatedMovies);

  const { data: upcomingMovies, isLoading: upcomingMoviesLoading } =
    useQuery<IResults>(["movies", "upcomingMovies"], getUpcomingMovies);

  const { data: clickedMovie, isLoading: clickedMovieLoading } =
    useQuery<IResult>(["movies", movieId], () => getMovieDetail(movieId));

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
      {nowPlayingLoading ||
      topRatedMoviesLoading ||
      upcomingMoviesLoading ||
      latestMoviesLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner title="Movie" data={latestMovie!} />
          {movieSlides.map((movie) => (
            <Sliders
              title={movie.title}
              data={movie.data}
              openModal={() => setIsOpen(true)}
              setMovieId={setMovieId}
            />
          ))}
          {isOpen &&
            (clickedMovieLoading ? (
              <Loader> Loading . . . </Loader>
            ) : (
              <ClickedModal
                closeModal={closeModal}
                clickedItem={clickedMovie!}
              />
            ))}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
