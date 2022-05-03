import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import ClientOnly from "../../components/Common/ClientOnly";
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
  const { slug } = props;

  //const { pagination, list } = props;

  const { paginationSettings, setPagination } = usePagination();

  const [items, setItems] = useState<SingleProduct[]>([]);
  const [curPage, setPage] = useState(0);

  const [priceSort] = useAtom(PriceFilter);
  const [sizeFilter] = useAtom(SizeFilter);

  const { data, isFetching, refetch } = useQuery(
    [`category-products-data`, slug],
    () =>
      getProductsDataByCategorySlug(slug as string, curPage, perPage, {
        price: priceSort,
        size: sizeFilter,
        instock: true,
      })
  );

  const { data: cat_data } = useQuery(["category-data", slug], () =>
    getCategoryDataBySlug(slug as string)
  );

  useEffect(() => {
    const refetchQuery = async () => {
      const data = await refetch();
      setItems(data?.data?.data?.products.data);
      setPagination(data?.data?.data?.products?.meta?.pagination);
    };

    refetchQuery();
  }, [curPage, refetch, priceSort, slug, sizeFilter, slug]);

  return (
    <ClientOnly>
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
    </ClientOnly>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const queryClient = new QueryClient();

  const slug = ctx.query.slug;

  await queryClient.prefetchQuery(["category-data", slug], () =>
    getCategoryDataBySlug(slug)
  );

  await queryClient.prefetchQuery(["category-products-data", slug], () =>
    getProductsDataByCategorySlug(slug, 1, perPage, { instock: true })
  );

  return {
    props: {
      slug: slug,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Category;
