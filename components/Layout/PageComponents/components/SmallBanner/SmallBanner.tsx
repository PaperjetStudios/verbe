import React, { Component } from "react";
import styles from "./styles.module.scss";

import { AspectRatio, Box, Button, Text, Flex } from "@chakra-ui/react";
import { SmallBannerProps } from "../../../../../data/layout/small-banner";
import { createImageLink } from "../../../../../config/util";

type Props = {
  layout: SmallBannerProps;
};

const SmallBanner: React.FC<Props> = ({ layout }) => {
  return (
    <AspectRatio
      ratio={12}
      className={styles.container}
      style={{
        backgroundImage: `url(${createImageLink(
          layout.Background.data.attributes.url
        )})`,
      }}
    >
      <Flex gap={5}>
        <Text
          fontSize="6xl"
          lineHeight={1}
          textAlign="center"
          fontWeight="extrabold"
        >
          {layout.BigText}
        </Text>
        <Box>
          <Text
            fontSize="2xl"
            color="#fff"
            textAlign="center"
            fontWeight="bold"
            textShadow="0 2px 4px rgba(0,0,0,0.2)"
          >
            {layout.SmallText}
          </Text>
        </Box>
      </Flex>
    </AspectRatio>
  );
};

export default SmallBanner;
