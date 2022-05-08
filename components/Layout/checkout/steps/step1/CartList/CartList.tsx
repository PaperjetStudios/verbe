import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Items } from "../../../../../../data/atoms/cart/cartAtoms";
import { CartItem } from "../../../../../../data/atoms/cart/types";
import { default as CartItemElement } from "../CartItem/CartItem";

import styles from "./CartList.module.scss";

export type CartListProps = {};

const CartList: React.FC<CartListProps> = ({}) => {
  const [cart] = useAtom(Items);

  return (
    <Box className={styles.container}>
      <Stack spacing={3}>
        <Text fontWeight="bold">Your Cart:</Text>
        <Divider />
        {cart.map((obj: CartItem, ind: number) => {
          return (
            <CartItemElement
              key={obj.Product.data.attributes.Title + ind}
              Index={{ product: ind }}
              {...obj}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default CartList;
