import React from "react";
import styles from "./styles.module.scss";

import { Box, Button } from "@chakra-ui/react";

import Link from "next/link";

import {
  createCategoryLink,
  createImageLink,
} from "../../../../../config/util";

import { FeaturedProps } from "../../../../../data/layout/featured";

import CenteredHeader from "../../../../Common/CenteredHeader/CenteredHeader";

type Props = {
  layout: FeaturedProps;
};

const Featured: React.FC<Props> = ({ layout }) => {
  const { ImageMain, Title, Category } = layout;

  const link = createCategoryLink(Category?.data?.attributes.slug);
  return (
    <Box pt="50px" className={styles.container}>
      <CenteredHeader title={Title} />
      <Box display="flex" justifyContent={"center"} mb={10}>
        <Link href={link}>
          <a>
            <Button variant="verbe">Shop Now</Button>
          </a>
        </Link>
      </Box>
      <Box
        className={styles.image}
        style={{
          backgroundImage: `url(${createImageLink(
            ImageMain.data?.attributes.url
          )})`,
        }}
      ></Box>
    </Box>
  );
};

export default Featured;
