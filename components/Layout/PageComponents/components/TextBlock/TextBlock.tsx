import React, { Component } from "react";
import styles from "./styles.module.scss";

import { Box, Button } from "@chakra-ui/react";
import { TextBlockProps } from "../../../../../data/layout/text-block";
import CenteredHeader from "../../../../Common/CenteredHeader/CenteredHeader";
import ReactMarkdown from "react-markdown";

type Props = {
  layout: TextBlockProps;
};

const TextBlock: React.FC<Props> = ({ layout }) => {
  const { Text, ImageMain, ImageRight, Title } = layout;
  const ImageEl = ImageMain?.data && (
    <img
      className={styles.mainImage}
      key="1"
      src={ImageMain.data.attributes.formats.medium.url}
    />
  );

  return (
    <Box className={ImageMain?.data ? styles.container : styles.container2}>
      <Box className={styles.infoHolder}>
        {!ImageRight && <>{ImageEl}</>}
        <Box className={styles.text}>
          <h1>{Title}</h1>
          <ReactMarkdown>{Text}</ReactMarkdown>
        </Box>
        {ImageRight && <>{ImageEl}</>}
      </Box>
    </Box>
  );
};

export default TextBlock;
