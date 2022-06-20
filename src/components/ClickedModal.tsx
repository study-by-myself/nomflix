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
  top: -50px;
  color: ${(props) => props.theme.white.lighter};
`;

const BigError = styled.h1`
  padding-top: 300px;
  text-align: center;
  font-size: 46px;
`;

interface IResultModalProps {
  clickedItem?: IResult;
  closeModal: () => void;
  movieId?: number | null;
}

const ClickedModal = ({
  clickedItem,
  closeModal,
  movieId,
}: IResultModalProps) => {
  const { scrollY } = useViewportScroll();

  console.log(clickedItem?.id.toString());
  console.log(clickedItem?.title);

  return (
    <AnimatePresence>
      {clickedItem ? (
        <>
          <Overlay
            onClick={closeModal}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            layoutId={movieId?.toString() || clickedItem.id.toString()}
          >
            {clickedItem ? (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedItem.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <BigTitle>
                  {clickedItem.title || clickedItem.name || "No Title"}
                </BigTitle>
                <BigOverview>
                  {clickedItem.overview || "There is No Overview"}
                </BigOverview>
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

export default ClickedModal;
