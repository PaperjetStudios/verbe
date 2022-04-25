import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { Component } from "react";
import {
  createCategoryLink,
  createImageLink,
} from "../../../../../config/util";
import { CategoryListingItem } from "../../../../../data/layout/category-listing";

import { Icons } from "../../../../Common/icons";

import styles from "./card.module.scss";

type Props = {
  feature: CategoryListingItem;
};

const FeaturedCard: React.FC<Props> = ({ feature }) => {
  return (
    <Link href={createCategoryLink(feature?.category?.data?.attributes.slug)}>
      <a className={styles.container}>
        <Box
          className={styles.box}
          style={{
            backgroundImage: `url(${createImageLink(
              feature?.Image?.data?.attributes.url
            )})`,
          }}
        >
          <Box className={styles.bottom}>
            <Text className={styles.title}>
              Shop
              <br />
              {feature.category.data.attributes.Title}
            </Text>
            <Box className={styles.cta}>
              <span>Shop Now</span> {Icons.chevron.right}
            </Box>
          </Box>
        </Box>
      </a>
    </Link>
  );
};

export default FeaturedCard;
