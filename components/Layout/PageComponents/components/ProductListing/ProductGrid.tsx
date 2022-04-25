import React, { useRef } from "react";

import { Box, Grid, Text } from "@chakra-ui/react";

import ProductCard from "./ProductCard";
import { SingleProduct } from "../../../../../data/products/types";

type Props = {
  pagination?: boolean;
  items: SingleProduct[];
  columns?: string;
};

const ProductGrid: React.FC<Props> = ({
  columns = "repeat(4, 1fr)",
  items = [],
}) => {
  return (
    <>
      <Box w="100%">
        {items.length > 0 && (
          <Grid templateColumns={columns} gap={6}>
            {items.map((prod, ind) => {
              return <ProductCard key={prod.attributes.slug} product={prod} />;
            })}
          </Grid>
        )}
        {items.length === 0 && (
          <Box
            p="10"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap="3"
            border="1px solid #ddd"
          >
            <Text fontWeight="bold" fontSize="20">
              Oops!
            </Text>
            <Text>Nothing found! Please try with different filters.</Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProductGrid;
