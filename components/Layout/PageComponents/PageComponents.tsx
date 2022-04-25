import React, { useEffect, useState } from "react";
import styles from "./PageComponents.module.scss";

import { useQuery } from "react-query";
import { Box } from "@chakra-ui/react";

import TopSlider from "./components/TopSlider/TopSlider";
import Head from "next/head";
import FeaturedThree from "./components/FeaturedThree/FeaturedThree";
import ProductListing from "./components/ProductListing/ProductListing";
import SmallBanner from "./components/SmallBanner/SmallBanner";
import CategoryListing from "./components/CategoryListing/CategoryListing";
import DetailsListing from "./components/Details/DetailsListing";
import { getPageData } from "../../../data/layout/page-layout";
import Featured from "./components/Featured/Featured";
import SignUp from "./components/SignUp/SignUp";

type PageComponentsProps = {
  query: string;
  slug: string;
};

const createLayout = (Layouts: any, slug: string) => {
  const layout = Layouts.map((layout: any, index: number) => {
    switch (layout.__typename) {
      case "ComponentLayoutGallery":
        return <TopSlider key={slug + "-" + index} layout={layout} />;
      case "ComponentLayoutFeaturedThree":
        return <FeaturedThree key={slug + "-" + index} layout={layout} />;
      case "ComponentLayoutProductListing":
        return <ProductListing key={slug + "-" + index} layout={layout} />;
      case "ComponentLayoutDetailsListing":
        return <DetailsListing key={slug + "-" + index} layout={layout} />;
      case "ComponentLayoutSmallBanner":
        return <SmallBanner key={slug + "-" + index} layout={layout} />;
      case "ComponentLayoutSmallBanner":
        return <SmallBanner key={slug + "-" + index} layout={layout} />;
      case "ComponentLayoutCategoryListing":
        return <CategoryListing key={slug + "-" + index} layout={layout} />;
      case "ComponentLayoutStoreListing":
        return <Featured key={slug + "-" + index} layout={layout} />;
      case "ComponentLayoutSignUp":
        return <SignUp key={slug + "-" + index} layout={layout} />;
      default:
        return null;
    }
  });

  return layout;
};

const PageComponents: React.FC<PageComponentsProps> = ({ query, slug }) => {
  const { data, isLoading } = useQuery(query, () => getPageData(slug));
  const [layout, setLayout] = useState([]);

  const Page = data?.data.findPageBySlug.data.attributes;

  useEffect(() => {
    if (data) {
      setLayout(createLayout(Page.Layout, slug));
    }
  }, [data, Page]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{Page?.Title}</title>
        <meta name="description" content={`${Page?.MetaDescription}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.pageComponents}>{layout}</Box>
    </>
  );
};

export default PageComponents;
