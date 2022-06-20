import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovieDetail, IResult } from "../api";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const BigError = styled.h1`
  padding-top: 300px;
  text-align: center;
  font-size: 46px;
`;

interface IResultModalProps {
  movieId: number | null;
  closeModal: () => void;
}

const MovieModal = ({ movieId, closeModal }: IResultModalProps) => {
  const { data: clickedMovie } = useQuery<IResult>(["movies", movieId], () =>
    getMovieDetail(movieId)
  );

  const { scrollY } = useViewportScroll();
  const onOverlayClick = () => closeModal();

  return (
    <AnimatePresence>
      {clickedMovie ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            layoutId={clickedMovie.id.toString()}
          >
            {clickedMovie ? (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <BigTitle>{clickedMovie.title}</BigTitle>
                <BigOverview>{clickedMovie.overview}</BigOverview>
              </>
            ) : (
              <BigError>Opps! There is no data . . .</BigError>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default MovieModal;
