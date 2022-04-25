import { Box, HStack, Select } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Filter from "../../components/Common/Filter/Filter";

import Loader from "../../components/Common/Loader/Loader";
import ProductGrid from "../../components/Layout/PageComponents/components/ProductListing/ProductGrid";
import Pagination from "../../components/Layout/Pagination/Pagination";
import usePagination from "../../components/Layout/Pagination/usePagination";
import { PriceFilter, SizeFilter } from "../../data/atoms/filter/filterAtoms";
import { getCategoryDataBySlug } from "../../data/categories/categories";
import { getProductsDataByCategorySlug } from "../../data/products/products";
import { SingleProduct } from "../../data/products/types";

import styles from "./styles.module.scss";

const perPage = 8;

const Category = (props: any) => {
  const router = useRouter();
  const { slug } = router.query;
  const { pagination, list } = props;

  const { paginationSettings, setPagination } = usePagination(pagination);

  const [items, setItems] = useState<SingleProduct[]>([]);
  const [curPage, setPage] = useState(pagination.page);

  const [priceSort] = useAtom(PriceFilter);
  const [sizeFilter] = useAtom(SizeFilter);

  const { data, isLoading, isFetching, refetch } = useQuery(
    [`category-data`, slug],
    () =>
      getProductsDataByCategorySlug(slug as string, curPage, perPage, {
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
  }, [curPage, refetch, priceSort, sizeFilter, slug]);

  return (
    <Box className={styles.greyBacking}>
      <Box className={styles.container}>
        <Box display="flex" justifyContent={"flex-end"}>
          <Filter />
        </Box>
        <Box py="10">
          {!isFetching && <ProductGrid items={items} />}
          {isFetching && <Loader />}
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
  const category = await getCategoryDataBySlug(context.params.slug);
  const list = await getProductsDataByCategorySlug(
    context.params.slug,
    1,
    perPage,
    { instock: true }
  );

  return {
    props: {
      category: category,
      pagination: list.data.products.meta.pagination,
    },
  };
};

export default Category;
