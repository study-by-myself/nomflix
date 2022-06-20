import { useState } from "react";
import { useQuery } from "react-query";
import {
  getAiringToday,
  getLatestTV,
  getPopularTV,
  getTopRatedTV,
  IResults,
  IResult,
  getTVDetail,
} from "../api";
import Banner from "../components/Banner";
import Loader from "../components/common/styled/Loader";
import { Wrapper } from "../components/common/styled/Wrapper";
import ClickedModal from "../components/ClickedModal";
import Sliders from "../components/Sliders";

function Tv() {
  const [isOpen, setIsOpen] = useState(false);
  const [tvId, setTvId] = useState<number | null>(null);

  const { data: latestTV, isLoading: latestLoading } = useQuery<IResult>(
    ["TVs", "latest"],
    getLatestTV
  );
  const { data: airingTodayTV, isLoading: airingTodayLoading } =
    useQuery<IResults>(["TVs", "airingToday"], getAiringToday);
  const { data: popularTV, isLoading: popularLoading } = useQuery<IResults>(
    ["TVs", "popular"],
    getPopularTV
  );
  const { data: topRatedTV, isLoading: topRatedLoading } = useQuery<IResults>(
    ["TVs", "topRated"],
    getTopRatedTV
  );

  const { data: clickedTV, isLoading: clickedTVLoading } = useQuery<IResult>(
    ["TVs", tvId],
    () => getTVDetail(tvId)
  );

  const TVSlide = [
    { title: "Airing Today >", data: airingTodayTV },
    { title: "Popular TV shows >", data: popularTV },
    { title: "Top Rated TV shows >", data: topRatedTV },
  ];

  const closeModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Wrapper>
      {latestLoading ||
      airingTodayLoading ||
      popularLoading ||
      topRatedLoading ? (
        <Loader> Loading . . . </Loader>
      ) : (
        <ul>
          <Banner title="TV show" data={latestTV}></Banner>
          {TVSlide.map((tv) => (
            <Sliders
              title={tv.title}
              data={tv.data}
              openModal={() => setIsOpen(true)}
              setMovieId={setTvId}
            />
          ))}
          {isOpen &&
            (clickedTVLoading ? (
              <Loader>Loading . . . </Loader>
            ) : (
              <ClickedModal closeModal={closeModal} clickedItem={clickedTV!} />
            ))}
        </ul>
      )}
    </Wrapper>
  );
}

export default Tv;
