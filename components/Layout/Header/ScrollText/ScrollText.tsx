import { Box, Text } from "@chakra-ui/react";

import styles from "./ScrollText.module.scss";

import { useEffect, useRef } from "react";

const words = [
  "BELIEVE",
  "INSPIRE",
  "RUN",
  "POWER",
  "BALANCE",
  "FITNESS",
  "STRENGTH",
  "WORKOUT",
  "MOVEMENT",
  "MIND",
  "ENERGY",
  "BODY",
  "NOURISH",
  "STRETCH",
  "FOCUS",
  "ENDURANCE",
];

export type ScrollTextProps = {};
const wordStyle = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#fff",
  textTransform: "uppercase",
};
const ScrollText: React.FC<ScrollTextProps> = ({}) => {
  const el = useRef();
  /*
  const q = gsap.utils.selector(el);

  useEffect(() => {
    gsap.to(q(".text"), {
      x: "-=200vw",
      ease: "linear",
      repeat: -1,
      duration: 5,
    });
  }, []);*/

  return (
    <Box className={styles.scrollTextContainer}>
      <Box className={styles.inner}>
        <Box className={styles.cont}>
          {words.map((word, index) => (
            <Text key={"word_1_" + index} sx={wordStyle}>
              {word}
            </Text>
          ))}
          {words.map((word, index) => (
            <Text key={"word_2_" + index} sx={wordStyle}>
              {word}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ScrollText;
