import { Box } from "@chakra-ui/react";
import Link from "next/link";
import React, { Component } from "react";
import {
  createCategoryLink,
  createImageLink,
} from "../../../../../config/util";
import { FeaturedThreeItemProps } from "../../../../../data/layout/featured-three";
import { Icons } from "../../../../Common/icons";

import styles from "./card.module.scss";

type Props = {
  feature: FeaturedThreeItemProps;
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
          <Box className={styles.cta}>
            <span>{feature.Text}</span> {Icons.chevron.right}
          </Box>
        </Box>
      </a>
    </Link>
  );
};

export default FeaturedCard;
