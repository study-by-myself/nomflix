import { useQuery } from "react-query";
import {
  getAiringToday,
  getLatestTV,
  getPopularTV,
  getTopRatedTV,
  IGetTVResult,
  IResult,
} from "../api";
import Banner from "../components/Banner";
import Loader from "../components/common/styled/Loader";
import { Wrapper } from "../components/common/styled/Wrapper";

function Tv() {
  const { data: latestTV, isLoading: latestLoading } = useQuery<IResult>(
    ["TVs", "latest"],
    getLatestTV
  );
  const { data: airingTodayTV, isLoading: airingTodayLoading } =
    useQuery<IGetTVResult>(["TVs", "airingToday"], getAiringToday);
  const { data: popularTV, isLoading: popularLoading } = useQuery<IGetTVResult>(
    ["TVs", "popular"],
    getPopularTV
  );
  const { data: topRatedTV, isLoading: topRatedLoading } =
    useQuery<IGetTVResult>(["TVs", "topRated"], getTopRatedTV);

  return (
    <Wrapper>
      {latestLoading ||
      airingTodayLoading ||
      popularLoading ||
      topRatedLoading ? (
        <Loader> Loading . . . </Loader>
      ) : (
        <ul>
          <Banner data={latestTV}></Banner>
          {/* {TvData?.results.map((data) => (
        <li key={data.id}>{data.name}</li>
      ))} */}
        </ul>
      )}
    </Wrapper>
  );
}

export default Tv;
