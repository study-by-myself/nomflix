import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { IResults } from "../api";
import ResultBox from "./ResultBox";
import { Row } from "./common/styled/Row";
import StyledTitle from "./common/styled/StyledTitle";
import { Dispatch, SetStateAction, useState } from "react";
import { Wrapper } from "./common/styled/Wrapper";

const offset = 6;

const Slider = styled.div`
  position: relative;
  margin-top: -20px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

interface ISliderProps {
  title: string;
  toggleLeaving?: () => void;
  data?: IResults;
  openModal: () => void;
  setMovieId: (movieId: number) => void;
}

const Sliders = ({ title, data, openModal, setMovieId }: ISliderProps) => {
  const [index, setIndex] = useState(0);

  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const increaseIndex = (
    data: IResults,
    setIndex: Dispatch<SetStateAction<number>>
  ) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const onBoxClicked = (movieId: number) => {
    openModal();
    setMovieId(movieId);
  };
  return (
    <Slider>
      <Wrapper>
        <StyledTitle onClick={() => increaseIndex(data!, setIndex)}>
          {title}
        </StyledTitle>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <ResultBox
                  key={movie.id}
                  data={movie}
                  onBoxClicked={onBoxClicked}
                />
              ))}
          </Row>
        </AnimatePresence>
      </Wrapper>
    </Slider>
  );
};

export default Sliders;
