import React, { Component } from "react";
import styles from "./styles.module.scss";
import Slider from "react-slick";

import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import { createImageLink } from "../../../../../config/util";
import { LayoutImageType } from "../../../../../data/layout/base";

type TopBannerProps = {
  image: LayoutImageType;
  text: string;
};

const TopBanner: React.FC<TopBannerProps> = ({ image, text }) => {
  return (
    <AspectRatio
      ratio={18}
      className={styles.container}
      style={{
        backgroundImage: `url(${createImageLink(image?.data?.attributes.url)})`,
      }}
    >
      <Flex gap={5}>
        <Text
          className={styles.heading}
          fontSize="4xl"
          color="#fff"
          lineHeight={1}
          textAlign="center"
          fontWeight="extrabold"
        >
          {text}
        </Text>
      </Flex>
    </AspectRatio>
  );
};

export default TopBanner;
