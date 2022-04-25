import React from "react";
import styles from "./styles.module.scss";

import { Box, Flex } from "@chakra-ui/react";

import FeaturedCard from "./Card";
import { FeaturedThreeProps } from "../../../../../data/layout/featured-three";

type Props = {
  layout: FeaturedThreeProps;
};

const FeaturedThree: React.FC<Props> = ({ layout }) => {
  return (
    <Box className={styles.container}>
      <Flex align="center" justify="space-between" gap={8}>
        {layout.Featured.map((feature, ind) => {
          return <FeaturedCard key={layout.id + "-" + ind} feature={feature} />;
        })}
      </Flex>
    </Box>
  );
};

export default FeaturedThree;
