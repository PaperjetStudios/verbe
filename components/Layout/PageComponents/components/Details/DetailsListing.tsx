import React, { Component } from "react";
import styles from "./styles.module.scss";

import { Box, Text, Flex, Grid } from "@chakra-ui/react";
import { Icons } from "../../../../Common/icons";
import {
  DetailsListingItem,
  DetailsListingProps,
} from "../../../../../data/layout/details-listing";

type Props = {
  layout: DetailsListingProps;
};

const DetailItem: React.FC<DetailsListingItem> = ({
  Icon,
  Heading,
  Description,
}) => {
  let IconElement = Icons.camera;

  switch (Icon) {
    case "Unique":
      IconElement = Icons.badgeCheck;
      break;
    case "CustomerSupport":
      IconElement = Icons.menu.userSolid;
      break;
    case "Shipping":
      IconElement = Icons.truck;
      break;
    case "SecurePayments":
      IconElement = Icons.dollar;
      break;
  }
  return (
    <Flex
      textAlign="center"
      gap={2}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box className={styles.icon} pb={2}>
        {IconElement}
      </Box>
      <Text fontWeight="bold">{Heading}</Text>
      <Text fontSize="sm" color="#666666">
        {Description}
      </Text>
    </Flex>
  );
};

const DetailsListing: React.FC<Props> = ({ layout }) => {
  return (
    <Grid
      pb="100px"
      pt="70px"
      className={styles.container}
      gridTemplateColumns="repeat(4,1fr)"
      gap={10}
    >
      {layout.Details.map((detail, ind) => {
        return <DetailItem key={ind + detail.Heading} {...detail} />;
      })}
    </Grid>
  );
};

export default DetailsListing;
