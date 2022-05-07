import React, { useRef } from "react";

import { Box, Grid, Text } from "@chakra-ui/react";

import ProductCard from "./ProductCard";
import { SingleProduct } from "../../../../../data/products/types";
import Swipable from "../../../../Common/Swipable/Swipable";

type Props = {
  pagination?: boolean;
  items: SingleProduct[];

  swipable?: boolean;
};

const ProductGrid: React.FC<Props> = ({ swipable = false, items = [] }) => {
  const columns = swipable
    ? ["repeat(4, 250px)", null, null, "repeat(4, 1fr)"]
    : ["repeat(2, 1fr)", "repeat(2, 1fr)", null, "repeat(4, 1fr)"];

  const content = (
    <Box>
      {items.length > 0 && (
        <Grid
          templateColumns={columns}
          px={[3, null, null, 0]}
          gap={swipable ? [3, null, null, 6] : [3, null, null, 6]}
        >
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
          gap={3}
          border="1px solid #ddd"
        >
          <Text fontWeight="bold" fontSize="20">
            Oops!
          </Text>
          <Text>Nothing found! Please try with different filters.</Text>
        </Box>
      )}
    </Box>
  );

  if (swipable) {
    return <Swipable>{content}</Swipable>;
  } else {
    return content;
  }
};

export default ProductGrid;
