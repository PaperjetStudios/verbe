import React, { Component } from "react";
import styles from "./styles.module.scss";

import { Box, Button } from "@chakra-ui/react";
import { TextBlockProps } from "../../../../../data/layout/text-block";

type Props = {
  layout: TextBlockProps;
};

const TextBlock: React.FC<Props> = ({ layout }) => {
  return <Box className={styles.container}></Box>;
};

export default TextBlock;
