import { motion } from "framer-motion";
import styled from "styled-components";
import { IResult } from "../api";
import { makeImagePath } from "../utils";

interface IResultBoxProps {
  data: IResult;
  onBoxClicked: (id: number) => void;
}

const ResultBox = ({ data, onBoxClicked }: IResultBoxProps) => {
  return (
    <Box
      layoutId={data.id + ""}
      key={data.id}
      whileHover="hover"
      initial="normal"
      variants={boxVariants}
      onClick={() => onBoxClicked(data.id)}
      transition={{ type: "tween" }}
      $bgPhoto={makeImagePath(data.backdrop_path, "w500")}
    >
      <Info variants={infoVariants}>
        <h4>{data.title || "No title"}</h4>
      </Info>
    </Box>
  );
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

export default ResultBox;
