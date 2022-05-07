import React, { Component } from "react";
import styles from "./styles.module.scss";

import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";

import { useQuery } from "react-query";
import ProductGrid from "./ProductGrid";
import { ProductListingProps } from "../../../../../data/layout/product-listing";
import {
  getProductsDataByCategorySlug,
  getProductsDataByTag,
} from "../../../../../data/products/products";
import { ProductProps } from "../../../../../data/products/types";
import CenteredHeader from "../../../../Common/CenteredHeader/CenteredHeader";

type Props = {
  layout: ProductListingProps;
};

const ProductListing: React.FC<Props> = ({ layout }) => {
  let getDataFunction = () =>
    getProductsDataByCategorySlug("all", 1, 4, { instock: true });
  let queryName = "";

  if (layout.category.data) {
    const slug = layout.category.data.attributes.slug;
    queryName = `products-by-category-${slug}`;
    getDataFunction = () =>
      getProductsDataByCategorySlug(slug, 1, 4, { instock: true });
  } else if (layout.tag.data) {
    const slug = layout.tag.data.attributes.slug;
    queryName = `products-by-tag-${slug}`;
    getDataFunction = () => getProductsDataByTag(slug, 1, 4, { instock: true });
  }

  const { data, isLoading } = useQuery<ProductProps>(
    queryName,
    getDataFunction
  );

  const products = data?.data.products.data;

  if (products) {
    return (
      <Box className={styles.container}>
        <CenteredHeader title={layout.Title} />
        <ProductGrid items={products} swipable={true} />
      </Box>
    );
  } else {
    return null;
  }
};

export default ProductListing;
