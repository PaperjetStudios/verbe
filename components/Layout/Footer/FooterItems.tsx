import React from "react";
import styles from "./items.module.scss";

import { Box, Flex, Text } from "@chakra-ui/react";

import Link from "next/link";
import { MainMenuItemType } from "../../../data/settings/main-menu";
import { Icons } from "../../Common/icons";

type Props = {
  items: MainMenuItemType[];
};

const FooterItems: React.FC<Props> = ({ items }) => {
  let url = "";
  if (items.length > 0) {
    return (
      <Box className={styles.container}>
        <Flex flexDir={"column"} justify="space-between" gap={1}>
          {items.map((item, ind) => {
            return (
              <Link href={url} key={item.Title + "-" + ind}>
                <a>
                  <Text className={styles.footerMenuItem} fontSize="12px">
                    <span>{item.Title}</span> {Icons.chevron.right}
                  </Text>
                </a>
              </Link>
            );
          })}
        </Flex>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default FooterItems;
