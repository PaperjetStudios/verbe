import { AspectRatio, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  createProductImageLink,
  createProductLink,
  moneyFormatter,
} from "../../../../../config/util";
import { SingleProduct } from "../../../../../data/products/types";
import Wishlist from "../../../Product/Wishlist";

import styles from "./card.module.scss";

type Props = {
  product: SingleProduct;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const atts = product.attributes;
  return (
    <Box className={styles.box}>
      <Wishlist
        className={styles.wishlist}
        size="sm"
        variant="transparent"
        id={product.id}
      />
      <Link href={createProductLink(product.attributes.slug)}>
        <a className={styles.container}>
          <AspectRatio
            ratio={0.85}
            className={styles.featuredImage}
            style={{
              backgroundImage: `url(${createProductImageLink(
                product.attributes.Featured_Image?.data?.attributes,
                "large"
              )})`,
            }}
          >
            <></>
          </AspectRatio>
          <Box p={5} pb={4}>
            <Text fontSize="sm" fontWeight="semibold">
              {atts.Title}
            </Text>
            <Text fontSize="sm" color="#999">
              {moneyFormatter(atts.Price)}
            </Text>
          </Box>
        </a>
      </Link>
    </Box>
  );
};

export default ProductCard;
