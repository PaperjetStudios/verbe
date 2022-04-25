import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import * as React from "react";
import { Items } from "../../../data/atoms/cart/cartAtoms";
import { CartItem, CartItems } from "../../../data/atoms/cart/types";

import ProductPanelListItem from "./CartItem";

type Props = {};

const CartItemList: React.FC<Props> = () => {
  const [cart] = useAtom(Items);

  return (
    <Box>
      {cart.map((item: CartItem, index: number) => {
        return (
          <ProductPanelListItem
            key={`product_${index}`}
            Index={{ product: index }}
            {...item}
          />
        );
      })}
    </Box>
  );
};

export default CartItemList;
