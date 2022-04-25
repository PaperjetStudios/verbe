import { Box, IconButton, Input } from "@chakra-ui/react";
import React from "react";
import { SingleVariation } from "../../../data/products/types";
import { Icons } from "../../Common/icons";

import styles from "./Quantity.module.scss";

type QuantityProps = {
  quantity: number;
  setQuantity: any;
  variation: SingleVariation;
};

const Quantity: React.FC<QuantityProps> = ({
  quantity,
  setQuantity,
  variation,
}) => {
  const available = variation.Quantity;

  const setQuantityHandler = (e?: number | string, number: number = 0) => {
    let newQuantity = 0;
    if (e) {
      newQuantity = typeof e === "string" ? parseInt(e) : e;
    } else {
      newQuantity = quantity + number;
    }

    if (newQuantity > available) {
      newQuantity = available;
    }

    if (newQuantity < 1) {
      newQuantity = 1;
    }

    setQuantity(newQuantity);
  };

  return (
    <Box className={styles.container}>
      <IconButton
        variant="ghost"
        icon={Icons.minus}
        aria-label="Add"
        onClick={() => setQuantityHandler(undefined, -1)}
      />
      <Input
        value={quantity}
        onChange={(e) => setQuantityHandler(e.currentTarget.value)}
        type="number"
      />
      <IconButton
        variant="ghost"
        icon={Icons.plus}
        aria-label="Add"
        onClick={() => setQuantityHandler(undefined, 1)}
      />
    </Box>
  );
};

export default Quantity;
