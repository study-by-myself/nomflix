import { useQuery } from "react-query";
import styled from "styled-components";
import { getLatestMovies, IMovie } from "../api";
import { makeImagePath } from "../utils";
import Loader from "./common/styled/Loader";
import StyledTitle from "./common/styled/StyledTitle";

const Banner = () => {
  const { data: latestMovie, isLoading: latestMoviesLoading } =
    useQuery<IMovie>(["movies", "latestMovie"], getLatestMovies);
  return (
    <>
      {latestMoviesLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <BannerWrapper
          $bgPhoto={makeImagePath(latestMovie?.backdrop_path || "")}
        >
          <StyledTitle>Latest Movie</StyledTitle>
          <Title>{latestMovie?.title}</Title>
          <Overview>{latestMovie?.overview}</Overview>
        </BannerWrapper>
      )}
    </>
  );
};

const BannerWrapper = styled.div<{ $bgPhoto: string }>`
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

export default Banner;
