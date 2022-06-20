import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import {
  getMovieDetail,
  getMoviesBySearch,
  IResults,
  IResult,
  getTVDetail,
  getTVBySearch,
} from "../api";
import { Wrapper } from "../components/common/styled/Wrapper";
import styled from "styled-components";
import Loader from "../components/common/styled/Loader";
import ClickedModal from "../components/ClickedModal";
import Sliders from "../components/Sliders";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [tvOpen, setTVOpen] = useState(false);
  const [movieId, setMovieId] = useState<number | null>(null);
  const [tvId, setTVId] = useState<number | null>(null);
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<IResults>(["movies", "keyword"], () =>
      getMoviesBySearch(keyword!)
    );

  const { data: searchTV, isLoading: searchTVLoading } = useQuery<IResults>(
    ["TVs", "keyword"],
    () => getTVBySearch(keyword!)
  );

  const { data: movieDetail, isLoading: movieDetailLoading } =
    useQuery<IResult>(
      ["movies", "MovieDetail"],
      () => getMovieDetail(movieId),
      { enabled: !!movieId }
    );

  const { data: tvDetail, isLoading: tvDetailLoading } = useQuery<IResult>(
    ["TVs", "tvDetail"],
    () => getTVDetail(tvId),
    { enabled: !!tvId }
  );

  const closeModal = () => {
    setMovieId(null);
    setTVId(null);
    setIsOpen(false);
    setTVOpen(false);
  };

  const searchSlide = [
    {
      title: "Movie Results >",
      data: searchMovie,
      setId: setMovieId,
      setOpenModal: () => setIsOpen(true),
    },
    {
      title: "TV Results >",
      data: searchTV,
      setId: setTVId,
      setOpenModal: () => setTVOpen(true),
    },
  ];

  return (
    <Wrapper>
      {searchMovieLoading || searchTVLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {searchSlide.map((search) => (
            <Sliders
              title={search.title}
              data={search.data}
              openModal={search.setOpenModal}
              setMovieId={search.setId}
            />
          ))}
        </>
      )}
      {isOpen &&
        (movieDetailLoading ? (
          <Loader> Loading . . . </Loader>
        ) : (
          <ClickedModal
            movieId={movieId}
            closeModal={closeModal}
            clickedItem={movieDetail}
          />
        ))}
      {tvOpen &&
        (tvDetailLoading ? (
          <Loader> Loading . . . </Loader>
        ) : (
          <>
            <ClickedModal
              movieId={tvId}
              closeModal={closeModal}
              clickedItem={tvDetail}
            />
          </>
        ))}
    </Wrapper>
  );
}

const SearchContainer = styled.div`
  /* margin-top: 1000px; */
`;

export default Search;
