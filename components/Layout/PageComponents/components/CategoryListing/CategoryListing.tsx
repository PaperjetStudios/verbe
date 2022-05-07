import React from "react";
import styles from "./styles.module.scss";

import { AspectRatio, Box, Flex, Grid, Text } from "@chakra-ui/react";

import Link from "next/link";
import { CategoryListingProps } from "../../../../../data/layout/category-listing";
import {
  createCategoryLink,
  createImageLink,
} from "../../../../../config/util";
import FeaturedCard from "./Card";

type Props = {
  layout: CategoryListingProps;
};

const CategoryListing: React.FC<Props> = ({ layout }) => {
  return (
    <Box className={styles.greyBacking}>
      <Box className={styles.container}>
        <Flex
          px={["10px", null, null, "5%"]}
          align="center"
          flexDir={["column", "column", "column", "row"]}
          justify="space-between"
          gap={8}
        >
          {layout.Item.map((feature, ind) => {
            return (
              <FeaturedCard key={layout.id + "-" + ind} feature={feature} />
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export default CategoryListing;
