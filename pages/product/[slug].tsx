import { Box, Button, Divider, HStack, Stack, Text } from "@chakra-ui/react";

import { useState } from "react";

import {
  createCategoryLink,
  createProductLink,
  createTagLink,
  moneyFormatter,
} from "../../config/util";

import styles from "./productpage.module.scss";

import {
  getProductDataBySlug,
  getProductsDataByCategorySlug,
} from "../../data/products/products";

import Quantity from "../../components/Layout/Product/Quantity";
import { Icons } from "../../components/Common/icons";
import Wishlist from "../../components/Layout/Product/Wishlist";
import Link from "next/link";
import SocialShare from "../../components/Layout/Product/SocialShare";
import ProductTabs from "../../components/Layout/Product/Tabs";
import ProductGrid from "../../components/Layout/PageComponents/components/ProductListing/ProductGrid";

import { updateCart } from "../../data/atoms/cart/cartAtoms";
import TopBanner from "../../components/Layout/Product/TopBanner";
import Gallery from "../../components/Layout/Product/Gallery";
import { useAtom } from "jotai";
import { ToggleModal } from "../../data/atoms/modal/modalAtoms";
import { SingleProductAttributes } from "../../data/products/types";
import ReactMarkdown from "react-markdown";
import Variation from "../../components/Layout/Product/Variation";
import ReviewPreview from "../../components/Layout/Product/Reviews/ReviewPreview";

import Responsive from "../../components/Common/Responsive";

const Product = (props: any) => {
  const [currentVariation, setVariation] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const product = props.product.attributes as SingleProductAttributes;

  const variation = product.Variation[currentVariation];

  const [items, update] = useAtom(updateCart);
  const [_, toggleModal] = useAtom(ToggleModal);

  return (
    <>
      <Box key={props.product.id}>
        <TopBanner title={product.Title} />
        <Box className={styles.container}>
          <Gallery
            items={[product.Featured_Image.data, ...product.Gallery.data]}
          />

          <Box flex={1} p={["30px", null, null, 0]}>
            <Box display="flex" justifyContent={"space-between"}>
              <Box>
                <Text fontWeight="600" fontSize="2xl">
                  {product.Title}
                </Text>

                <ReviewPreview
                  rating={product.Rating}
                  reviews={product.Reviews.data.length}
                />
              </Box>
            </Box>

            <Box
              className={styles.description}
              mt={5}
              color="#666666"
              fontWeight="400"
              fontSize="sm"
            >
              <ReactMarkdown>{product.Description}</ReactMarkdown>
            </Box>

            <Divider mt={6} mb={6} />
            <HStack spacing={10}>
              <Text key={"price"} fontWeight="600" fontSize="xl">
                {moneyFormatter(product.Price)}
              </Text>
            </HStack>
            <Divider mt={6} mb={6} />

            <Variation
              value={currentVariation}
              onChange={setVariation}
              variations={product.Variation}
              id={props.product.id}
            />
            <Divider mt={6} mb={6} />

            <Responsive.Desktop>
              <Box display="flex" gap={5} key="quantity">
                {variation.Quantity > 0 && (
                  <>
                    <Quantity
                      quantity={quantity}
                      setQuantity={setQuantity}
                      variation={product.Variation[0]}
                    />

                    <Button
                      onClick={() => {
                        update({
                          product: {
                            data: props.product,
                          },
                          quantityValue: quantity,
                          variationValue: currentVariation,
                          showCartAfter: true,
                        });
                      }}
                      leftIcon={Icons.shoppingcart}
                      variant="main"
                    >
                      Add to Cart
                    </Button>
                  </>
                )}
                {variation.Quantity === 0 && (
                  <Button
                    disabled={true}
                    leftIcon={Icons.shoppingcart}
                    variant="main"
                  >
                    Out of Stock
                  </Button>
                )}
                <Wishlist id={props.product.id} />
              </Box>
              <Divider mt={6} mb={6} />
            </Responsive.Desktop>

            <Responsive.Mobile>
              <Box
                display="flex"
                bg="#fff"
                justifyContent={"space-between"}
                p="3"
                gap={4}
                position={"fixed"}
                bottom={0}
                left={0}
                right={0}
                zIndex={1000}
              >
                <Quantity
                  quantity={quantity}
                  setQuantity={setQuantity}
                  variation={product.Variation[0]}
                />

                <Button
                  onClick={() => {
                    update({
                      product: {
                        data: props.product,
                      },
                      quantityValue: quantity,
                      variationValue: currentVariation,
                      showCartAfter: true,
                    });
                  }}
                  leftIcon={Icons.shoppingcart}
                  variant="main"
                >
                  Add to Cart
                </Button>
              </Box>
            </Responsive.Mobile>

            <Stack key="info">
              <Text key="availability" color="#555" fontSize={"sm"}>
                Availability:{" "}
                <Text as="span" color="#111" display={"inline-block"}>
                  {!product.Variation[currentVariation].Quantity
                    ? "Out of Stock"
                    : "In Stock"}
                </Text>
              </Text>
              <Text key="sku" color="#555" fontSize={"sm"}>
                SKU:{" "}
                <Text as="span" color="#111" display={"inline-block"}>
                  {product.SKU}
                </Text>
              </Text>
              <Text key="colour" color="#555" fontSize={"sm"}>
                Colour:{" "}
                <Text as="span" color="#111" display={"inline-block"}>
                  {product.Colour}
                </Text>
              </Text>
              <Text key="categories_list" color="#555" fontSize={"sm"}>
                Categories:{" "}
                {product.Categories.data.map((cat, ind) => {
                  return (
                    <>
                      <Link href={createCategoryLink(cat.attributes.slug)}>
                        <a>
                          <Text
                            as="span"
                            key={cat.id}
                            color="#111"
                            display={"inline-block"}
                          >
                            {cat.attributes.Title}
                          </Text>
                        </a>
                      </Link>
                      {ind !== product.Categories.data.length - 1 ? ", " : ""}
                    </>
                  );
                })}
              </Text>
              {product.Tags?.data?.length > 0 && (
                <Text key="tag_list" color="#555" fontSize={"sm"}>
                  Tags:{" "}
                  {product.Tags.data.map((tag, ind) => {
                    return (
                      <>
                        <Link href={createTagLink(tag.attributes.slug)}>
                          <a>
                            <Text
                              as="span"
                              key={tag.id}
                              color="#111"
                              display={"inline-block"}
                            >
                              {tag.attributes.Title}
                            </Text>
                          </a>
                        </Link>
                        {ind !== product.Tags.data.length - 1 ? ", " : ""}
                      </>
                    );
                  })}
                </Text>
              )}
              <HStack key="social_holder">
                <Text
                  key="social"
                  display="flex"
                  gap={2}
                  color="#555"
                  fontSize={"sm"}
                >
                  Share on:{" "}
                </Text>
                <SocialShare path={createProductLink(product.slug)} />
              </HStack>
            </Stack>
          </Box>
        </Box>

        <HStack
          w="100%"
          alignItems={"flex-start"}
          className={styles.sectionContainer}
        >
          <ProductTabs productData={product} id={props.product.id} />
        </HStack>
        <Box className={styles.sectionContainer}>
          <Text fontWeight="bold" mb={8} fontSize="3xl" textAlign="center">
            Similar Products
          </Text>
          <ProductGrid swipable={false} items={props.similar} />
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const data = await getProductDataBySlug(context.params.slug);
  const cat =
    data.data.findProductBySlug.data.attributes.Categories.data[0].attributes
      .slug;

  const similar = await getProductsDataByCategorySlug(cat, 1, 10, {
    instock: true,
  });

  return {
    props: {
      product: data.data.findProductBySlug.data,
      similar: similar.data.products.data,
    },
  };
};

export default Product;
