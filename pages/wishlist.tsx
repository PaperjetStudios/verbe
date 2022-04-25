import { Box, HStack, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

import { useAtom } from "jotai";
import ProductGrid from "../components/Layout/PageComponents/components/ProductListing/ProductGrid";
import Filter from "../components/Common/Filter/Filter";
import useUser from "../hooks/useUser";
import { getProductsById } from "../data/products/products";
import { SingleProduct } from "../data/products/types";
import { PriceFilter } from "../data/atoms/filter/filterAtoms";

import styles from "./styles.module.scss";

const Wishlist = (props: any) => {
  const router = useRouter();

  const [items, setItems] = useState<SingleProduct[]>([]);

  const [priceSort] = useAtom(PriceFilter);

  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    const getWishlistItems = async () => {
      const wishlist = user?.user?.Wishlist ? user.user.Wishlist : [];
      if (wishlist.length > 0) {
        const items = await getProductsById(wishlist, {
          price: priceSort,
        });
        setItems(items.data.products.data);
      } else {
        setItems([]);
      }
    };

    getWishlistItems();
  }, [user, priceSort]);

  return (
    <Box className={styles.greyBacking}>
      <Box className={styles.container}>
        <Box display="flex" justifyContent={"flex-end"}>
          <Filter />
        </Box>
        <Box py="10">
          <ProductGrid items={items} />
        </Box>
      </Box>
    </Box>
  );
};

export default Wishlist;
