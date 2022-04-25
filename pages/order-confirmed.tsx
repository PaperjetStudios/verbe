import { Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { ReactElement, useEffect } from "react";

import { clearCart } from "../data/atoms/cart/cartAtoms";

const pageQuery = "checkout";

const OrderConfirmed = () => {
  const [cart, clear] = useAtom(clearCart);
  useEffect(() => {
    clear(true);
  }, []);
  return <Text>Order Confirmed!</Text>;
};

export default OrderConfirmed;
