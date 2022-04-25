import { Box, Select, Text } from "@chakra-ui/react";
import React, { Component } from "react";
import { SingleVariation } from "../../../data/products/types";

import styles from "./Variation.module.scss";

type VariationProps = {
  variations: SingleVariation[];
  onChange: (e) => void;
  value: number;
};

const Variation: React.FC<VariationProps> = ({
  variations,
  value,
  onChange,
}) => {
  return (
    <Box className={styles.container}>
      <Text fontWeight={"bold"} fontSize="md" textTransform={"uppercase"}>
        Size:
      </Text>
      <Select
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
      >
        {variations.map((variation, index) => {
          return (
            <option key={variation.Size} value={index}>
              {variation.Size}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default Variation;
