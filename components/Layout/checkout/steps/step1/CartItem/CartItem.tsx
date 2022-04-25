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
          <Box pr={5}>
            <Text fontWeight="600">{Attributes.Title}</Text>
            <Text fontWeight="400" fontSize="sm">
              {VariationData.Size}
            </Text>

            <Box w="150px" mt={3}>
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
            </Box>
          </Box>
        </Box>

        <Text fontSize="md" fontWeight="bold" mr={5}>
          {moneyFormatter(Attributes.Price * Quantity)}
        </Text>
      </Box>
      <IconButton
        className={styles.closeButton}
        size="lg"
        aria-label="delete"
        variant="ghost"
        icon={Icons.close}
        onClick={() => remove({ product: Index.product })}
      />
    </Box>
  );
};

export default CartItem;
