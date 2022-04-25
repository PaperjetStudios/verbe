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
        templateColumns={"repeat(4, 1fr)"}
        pb={10}
        justifyContent="space-between"
        gap={10}
        className={styles.container}
      >
        {menuData.data.footerMenu.data.attributes.Footer_Columns.map(
          (column, index) => {
            return (
              <GridItem key={`${column.Title}-${index}`}>
                <Text mb={6} fontWeight="semibold">
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
      {/*  <ChatWidget />
    
        <SearchModal />*/}
      <GlobalModals />
    </>
  );
};

export default Footer;
