import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, getMoviesBySearch, IResults, IResult } from "../api";
import { Row } from "../components/common/styled/Row";
import ResultBox from "../components/ResultBox";
import ClickedModal from "../components/ClickedModal";
import Loader from "../components/common/styled/Loader";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [movieId, setMovieId] = useState<number | null>(null);
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data: searchResult } = useQuery<IResults>(["movies", "keyword"], () =>
    getMoviesBySearch(keyword!)
  );
  const { data: movieData, isLoading } = useQuery<IResult>(
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
            <ResultBox key={d.id} data={d} onBoxClicked={onClick} />
          ))}
        {isOpen &&
          (isLoading ? (
            <Loader>Loding . . .</Loader>
          ) : (
            <ClickedModal
              clickedItem={movieData!}
              closeModal={() => setIsOpen((prev) => !prev)}
            />
          ))}
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
