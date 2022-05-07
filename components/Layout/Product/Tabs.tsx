import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { SingleProductAttributes } from "../../../data/products/types";
import ReviewBox from "./Reviews/ReviewBox";
import Responsive from "../../Common/Responsive";

import styles from "./Tabs.module.scss";
import SizeGuide from "./SizeGuide/SizeGuide";

type ProductTabsProps = {
  productData: SingleProductAttributes;
  id: string | number;
};

const ProductTabs: React.FC<ProductTabsProps> = ({ productData, id }) => {
  const [currentTab, setCurrentTab] = React.useState<number>(0);

  const handleTabsChange = (index) => {
    setCurrentTab(index);
  };

  const tabTitles = [
    "Size Guide",
    "Fabric",
    "Care Instructions",
    "Reviews" +
      (productData?.Reviews?.data.length > 0
        ? " (" + productData.Reviews.data.length + ")"
        : ""),
  ];
  const tabContent = [
    <Box key="size-guide" className={styles.infoHolder}>
      <SizeGuide data={productData.SizeGuide} />
    </Box>,
    <Box key="content-fabric" className={styles.infoHolder}>
      <ReactMarkdown className={styles.fabric}>
        {productData.FabricContent}
      </ReactMarkdown>
    </Box>,
    <Box key="content-washcare" className={styles.infoHolder}>
      <ReactMarkdown className={styles.washcare}>
        {productData.WashcareInstructions}
      </ReactMarkdown>
    </Box>,
    <ReviewBox
      key="content-review"
      canReview={true}
      type="Product"
      id={id}
      ratingTotal={productData.RatingTotal}
      rating={productData.Rating}
      reviews={productData.Reviews.data}
    />,
  ];

  const accordionIndex = [0, 1, 2, 3];

  return (
    <>
      <Responsive.Desktop>
        <Tabs
          index={currentTab}
          onChange={handleTabsChange}
          colorScheme="main"
          className={styles.container}
          mb="50px"
        >
          <TabList>
            {tabTitles.map((title, index) => (
              <Tab
                key={"tab_title_" + title}
                fontWeight="bold"
                fontSize="sm"
                textTransform={"uppercase"}
              >
                {title}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {tabContent.map((content, index) => (
              <TabPanel key={"tab_content_" + index}>{content}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Responsive.Desktop>
      <Responsive.Mobile>
        <Accordion w="100%">
          {accordionIndex.map((index) => {
            return (
              <AccordionItem key={"accordion_panel_" + tabTitles[index]}>
                <AccordionButton
                  display="flex"
                  justifyContent={"space-between"}
                >
                  <Text fontWeight="bold" fontSize="sm">
                    {tabTitles[index]}
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>{tabContent[index]}</AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Responsive.Mobile>
    </>
  );
};

export default ProductTabs;
