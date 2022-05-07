import { Box, Divider, IconButton, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { moneyFormatter } from "../../../../../../config/util";
import {
  removeItem,
  updateItemQuantity,
} from "../../../../../../data/atoms/cart/cartAtoms";
import { CartItem } from "../../../../../../data/atoms/cart/types";
import { Icons } from "../../../../../Common/icons";

import { default as QuantitySelector } from "../../../../Product/Quantity";

import Responsive from "../../../../../Common/Responsive";

import styles from "./CartItem.module.scss";

export type CartItemProps = {
  Index: {
    product: number;
  };
};

const CartItem: React.FC<CartItemProps & CartItem> = ({
  Product,
  Variation,
  Quantity,
  Index,
}) => {
  const [cart, update] = useAtom(updateItemQuantity);
  const [_, remove] = useAtom(removeItem);

  const Attributes = Product.data.attributes;
  const VariationData = Attributes.Variation[Variation ? Variation : 0];

  return (
    <Box py="2" className={styles.spaceBetween}>
      <Box flex="1" className={styles.spaceBetween}>
        <Box mr={5} className={styles.middled}>
          <img
            width={100}
            height={100}
            src={
              Attributes.Featured_Image.data.attributes.formats.thumbnail.url
            }
            alt={Attributes.slug}
          />
          <Box pr={5} display="flex" flexDir="column" gap={2}>
            <Responsive.Mobile>
              <Text fontSize="md" fontWeight="bold" mr={5}>
                {moneyFormatter(Attributes.Price * Quantity)}
              </Text>
            </Responsive.Mobile>
            <Text fontWeight="600" fontSize={["sm", "lg"]}>
              {Attributes.Title}
            </Text>
            <Text fontWeight="400" fontSize={["xs", "sm"]}>
              Size: {VariationData.Size}
            </Text>

            <Box display="flex" mt={3}>
              <QuantitySelector
                variation={VariationData}
                setQuantity={(e: number) => {
                  update({
                    product: Index.product,
                    quantity: e,
                  });
                }}
                quantity={Quantity}
              />
              <Responsive.Mobile>
                <IconButton
                  className={styles.closeButtonMobile}
                  size="md"
                  aria-label="delete"
                  variant="ghost"
                  icon={Icons.trash}
                  onClick={() => remove({ product: Index.product })}
                />
              </Responsive.Mobile>
            </Box>
          </Box>
        </Box>
        <Responsive.Desktop>
          <Text fontSize="md" fontWeight="bold" mr={5}>
            {moneyFormatter(Attributes.Price * Quantity)}
          </Text>
        </Responsive.Desktop>
      </Box>
      <Responsive.Desktop>
        <IconButton
          className={styles.closeButton}
          size="lg"
          aria-label="delete"
          variant="ghost"
          icon={Icons.close}
          onClick={() => remove({ product: Index.product })}
        />
      </Responsive.Desktop>
    </Box>
  );
};

export default CartItem;
