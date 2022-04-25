import { Box, HStack, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

import { useQuery } from "react-query";
import Filter from "../../components/Common/Filter/Filter";

import { useAtom } from "jotai";
import { getProductsDataByTag } from "../../data/products/products";
import { getTagDataBySlug } from "../../data/tags/tags";
import Pagination from "../../components/Layout/Pagination/Pagination";
import ProductGrid from "../../components/Layout/PageComponents/components/ProductListing/ProductGrid";
import usePagination from "../../components/Layout/Pagination/usePagination";
import { SingleProduct } from "../../data/products/types";
import { PriceFilter, SizeFilter } from "../../data/atoms/filter/filterAtoms";

import styles from "./styles.module.scss";

const perPage = 2;

const Tag = (props: any) => {
  const router = useRouter();
  const { slug } = router.query;
  const { pagination, list } = props;

  const { paginationSettings, setPagination } = usePagination(pagination);

  const [items, setItems] = useState<SingleProduct[]>(list);
  const [curPage, setPage] = useState(pagination.page);

  const [priceSort] = useAtom(PriceFilter);
  const [sizeFilter] = useAtom(SizeFilter);

  const { data, isLoading, refetch } = useQuery(
    `category-data-${slug}`,
    () =>
      getProductsDataByTag(slug as string, curPage, perPage, {
        price: priceSort,
        size: sizeFilter,

        instock: true,
      }),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    const refetchQuery = async () => {
      const data = await refetch();
      setItems(data.data.data.products.data);
      const pagination = data.data.data.products.meta.pagination;
      setPagination(pagination);
    };

    refetchQuery();
  }, [curPage, refetch, sizeFilter, priceSort]);

  return (
    <Box className={styles.greyBacking}>
      <Box className={styles.container}>
        <Box display="flex" justifyContent={"flex-end"}>
          <Filter />
        </Box>
        <Box py="10">
          <ProductGrid items={items} />
        </Box>
        <Pagination
          page={curPage}
          settings={paginationSettings}
          setPage={setPage}
        />
      </Box>
    </Box>
  );
};

export const getServerSideProps = async (context: any) => {
  const list = await getProductsDataByTag(context.params.slug, 1, perPage, {
    instock: true,
  });

  const tag = await getTagDataBySlug(context.params.slug);

  return {
    props: {
      tag: tag,
      list: list.data.products.data,
      pagination: list.data.products.meta.pagination,
    },
  };
};

export default Tag;
