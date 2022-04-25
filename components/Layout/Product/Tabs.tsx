import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Divider,
} from "@chakra-ui/react";
import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { SingleProductAttributes } from "../../../data/products/types";
import ReviewBox from "./Reviews/ReviewBox";

import styles from "./Tabs.module.scss";

type ProductTabsProps = {
  productData: SingleProductAttributes;
  id: string | number;
};

const ProductTabs: React.FC<ProductTabsProps> = ({ productData, id }) => {
  return (
    <Tabs colorScheme="main" className={styles.container} mb="50px">
      <TabList>
        <Tab fontWeight="bold" fontSize="sm" textTransform={"uppercase"}>
          Fabric
        </Tab>
        <Tab fontWeight="bold" fontSize="sm" textTransform={"uppercase"}>
          Care Instructions
        </Tab>

        <Tab fontWeight="bold" fontSize="sm" textTransform={"uppercase"}>
          Reviews{" "}
          {productData.Reviews.data.length > 0 ? (
            <>({productData.Reviews.data.length})</>
          ) : (
            <></>
          )}
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Box className={styles.infoHolder}>
            <ReactMarkdown className={styles.fabric}>
              {productData.FabricContent}
            </ReactMarkdown>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box className={styles.infoHolder}>
            <ReactMarkdown className={styles.washcare}>
              {productData.WashcareInstructions}
            </ReactMarkdown>
          </Box>
        </TabPanel>
        <TabPanel>
          <ReviewBox
            canReview={true}
            type="Product"
            id={id}
            ratingTotal={productData.RatingTotal}
            rating={productData.Rating}
            reviews={productData.Reviews.data}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProductTabs;
