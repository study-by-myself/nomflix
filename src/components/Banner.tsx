import styled from "styled-components";
import { IResult } from "../api";
import { makeImagePath } from "../utils";
import StyledTitle from "./common/styled/StyledTitle";

interface IBannerProps {
  title: string;
  data?: IResult;
}

const Banner = ({ title, data }: IBannerProps) => {
  return (
    <BannerWrapper $bgPhoto={makeImagePath(data?.backdrop_path || "")}>
      <StyledTitle>Latest {title}</StyledTitle>
      <Title>{data?.title}</Title>
      <Overview>{data?.overview}</Overview>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div<{ $bgPhoto: string }>`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 50px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

export default Banner;
