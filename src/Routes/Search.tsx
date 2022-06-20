import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getMoviesBySearch, IGetSearchResult } from "../api";

function Search() {
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data, isLoading } = useQuery<IGetSearchResult>(
    ["movies", "keyword"],
    () => getMoviesBySearch(keyword!)
  );
  console.log(data);
  return (
    <Wrapper>
      {data && data.results.map((d) => <StyledRow>{d.name}</StyledRow>)}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: black;
  padding-top: 200px;
  display: flex;
  gap: 20px;
  margin: 20px;
`;

const StyledRow = styled.div`
  width: 200px;
  height: 200px;
  padding: 90px 0;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  text-align: center;
  font-size: 22px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.black.darker};
  }
`;

export default Search;
