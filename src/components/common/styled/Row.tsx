import { motion } from "framer-motion";
import styled from "styled-components";

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  height: 500px;
`;
