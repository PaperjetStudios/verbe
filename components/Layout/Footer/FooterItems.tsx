import React from "react";
import styles from "./items.module.scss";

import { Box, Flex, Text } from "@chakra-ui/react";

import Link from "next/link";
import { MainMenuItemType } from "../../../data/settings/main-menu";
import { Icons } from "../../Common/icons";
import { createCategoryLink } from "../../../config/util";

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
            const { Page, Category } = item;
            let slug = "";
            if (Page?.data) {
              slug =
                Page.data.attributes.slug === "home"
                  ? "/"
                  : Page?.data.attributes.slug;
            } else {
              slug = createCategoryLink(Category?.data?.attributes.slug);
            }

            return (
              <Link href={slug} key={item.Title + "-" + ind}>
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
