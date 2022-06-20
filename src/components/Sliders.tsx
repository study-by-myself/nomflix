import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { IGetMoviesResult } from "../api";
import MovieBox from "./MovieBox";
import { Row } from "./common/styled/Row";

const offset = 6;

const Slider = styled.div`
  position: relative;
  top: -100px;
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
  index: number;
  toggleLeaving?: () => void;
  data?: IGetMoviesResult;
  openModal: () => void;
  setMovieId: (movieId: number) => void;
}

const Sliders = ({
  index,
  toggleLeaving,
  data,
  openModal,
  setMovieId,
}: ISliderProps) => {
  const onBoxClicked = (movieId: number) => {
    openModal();
    setMovieId(movieId);
  };
  return (
    <Slider>
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
              <MovieBox movie={movie} onBoxClicked={onBoxClicked} />
            ))}
        </Row>
      </AnimatePresence>
    </Slider>
  );
};

export default Sliders;
