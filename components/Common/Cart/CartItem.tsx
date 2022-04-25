import { Box, Divider, IconButton, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import * as React from "react";
import { moneyFormatter } from "../../../config/util";
import { removeItem } from "../../../data/atoms/cart/cartAtoms";
import { CartItem } from "../../../data/atoms/cart/types";
import { Icons } from "../icons";

import styles from "./CartItem.module.scss";
type ProductPanelListItemProps = {
  Index: {
    product: number;
  };
};
const ProductPanelListItem: React.FC<CartItem & ProductPanelListItemProps> = ({
  Product,
  Quantity,
  Variation,
  Index,
}) => {
  const Attributes = Product.data.attributes;
  const VariationData = Attributes.Variation[Variation ? Variation : 0];

  const [_, removeItemCart] = useAtom(removeItem);

  return (
    <>
      <Box
        py="2"
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display="flex" alignItems={"center"}>
          <Box mr={5}>
            <img
              width={60}
              height={60}
              src={
                Attributes.Featured_Image.data.attributes.formats.thumbnail.url
              }
              alt={Attributes.slug}
            />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="600">
              {Attributes.Title}

              <Text
                as="span"
                color="#999"
                fontSize="xs"
                display="inline-block"
                ml={1}
              >
                x{Quantity}
              </Text>
            </Text>
            <Text fontSize="sm" fontWeight="600">
              Size: {VariationData.Size}
            </Text>
            <Text fontSize="sm">
              {moneyFormatter(Attributes.Price * Quantity)}
            </Text>
          </Box>
        </Box>
        <IconButton
          className={styles.closeButton}
          size="xs"
          aria-label="delete"
          variant="ghost"
          icon={Icons.close}
          onClick={() => removeItemCart({ product: Index.product })}
        />
      </Box>
      <Divider />
    </>
  );
};

export default ProductPanelListItem;
