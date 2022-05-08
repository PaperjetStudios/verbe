import { Box, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

import { useQuery } from "react-query";

import FooterItems from "./FooterItems";
import FooterWidgets from "./FooterWidgets";

import styles from "./Footer.module.scss";

import GlobalModals from "./GlobalModals";
import {
  FooterMenuDataType,
  getFooterMenu,
} from "../../../data/settings/main-menu";
import { getOptionData, OptionDataType } from "../../../data/settings/options";
import CartDrawer from "../../Common/Cart/CartDrawer";
import MobileMenu from "../MobileMenu/MobileMenu";

const Footer = () => {
  const { data: menuData, isLoading: menuLoading } =
    useQuery<FooterMenuDataType>("footer-menu", getFooterMenu);
  const { data: optionsData, isLoading: optionsLoading } =
    useQuery<OptionDataType>("options", getOptionData);

  if (!menuData || !optionsData) {
    return null;
  }

  return (
    <>
      <Divider mb={10} />
      <Grid
        templateColumns={["1fr", "repeat(2, 1fr)", null, "repeat(4, 1fr)"]}
        pb={10}
        justifyContent="space-between"
        gap={[5, null, null, 10]}
        className={styles.container}
      >
        {menuData.data.footerMenu.data.attributes.Footer_Columns.map(
          (column, index) => {
            return (
              <GridItem
                padding={["0 20px", null, null, "0"]}
                key={`${column.Title}-${index}`}
              >
                <Text
                  fontSize={["xl", null, null, "md"]}
                  mb={[3, null, null, 6]}
                  fontWeight="semibold"
                >
                  {column.Title}
                </Text>
                <FooterItems items={column.Items} />
                <FooterWidgets items={column.Widgets} />
              </GridItem>
            );
          }
        )}
      </Grid>
      <CartDrawer />
      <GlobalModals />
      <MobileMenu />

      {/*  <ChatWidget />
    
        <SearchModal />*/}
    </>
  );
};

export default Footer;
