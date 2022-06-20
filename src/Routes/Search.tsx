import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieDetail,
  getMoviesBySearch,
  IGetMoviesResult,
  IResult,
} from "../api";
import { Row } from "../components/common/styled/Row";
import ResultBox from "../components/ResultBox";
import MovieModal from "../components/MovieModal";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [movieId, setMovieId] = useState<number | null>(null);
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data: searchResult } = useQuery<IGetMoviesResult>(
    ["movies", "keyword"],
    () => getMoviesBySearch(keyword!)
  );
  const { data: movieData } = useQuery<IResult>(
    ["movies", "MovieDetail"],
    () => getMovieDetail(movieId),
    { enabled: !!movieId }
  );
  const onClick = (movieId: number) => {
    setMovieId(movieId);
    setIsOpen(true);
  };

  console.log(movieData);

  return (
    <Wrapper>
      <Row>
        {searchResult &&
          searchResult.results.map((d) => (
            <ResultBox key={d.id} movie={d} onBoxClicked={onClick} />
          ))}
        {isOpen && (
          <MovieModal
            movieId={movieId}
            closeModal={() => setIsOpen((prev) => !prev)}
          />
        )}
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: black;
  padding-top: 200px;
  margin: 20px;
`;

export default Search;
