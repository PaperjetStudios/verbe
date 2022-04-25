import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import Link from "next/link";
import { toggleDrawer } from "../../../data/atoms/cart/cartAtoms";

import CartItemList from "./CartItemList";

type CartDrawerProps = {};

const CartDrawer: React.FC<CartDrawerProps> = ({}) => {
  const [showing, setShowing] = useAtom(toggleDrawer);

  const onClose = () => {
    setShowing(false);
  };

  return (
    <>
      <Drawer isOpen={showing} placement="right" size={"md"} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>
          <Divider />
          <DrawerBody>
            <CartItemList />
          </DrawerBody>

          <DrawerFooter>
            <Link href="/checkout">
              <a style={{ width: "100%", display: "block" }}>
                <Button
                  isFullWidth={true}
                  variant="main"
                  mr={3}
                  onClick={onClose}
                >
                  Checkout
                </Button>
              </a>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
