import { gql } from "@apollo/client";
import client from "../../config/api";

import {
  FIND_PRODUCT_BY_CAT_SLUG,
  FIND_PRODUCT_BY_SLUG,
  FIND_PRODUCT_BY_TAG,
  GET_PRODUCTS_BY_ID,
  GET_PRODUCT_BY_ID,
} from "./queries";
import {
  ProductFilters,
  ProductProps,
  ProductSingleProps,
  SingleProduct,
} from "./types";

export const getProductById = async (id: string) => {
  const response = await client(null).query({
    query: GET_PRODUCT_BY_ID,
    variables: {
      id: id,
    },
  });

  return response.data.product.data as SingleProduct;
};

export const getProductDataBySlug = async (slug: string) => {
  const response = await client(null).query({
    query: FIND_PRODUCT_BY_SLUG,
    variables: {
      slug: slug,
    },
  });

  return response as ProductSingleProps;
};

export const makeFilterString = (filters?: ProductFilters) => {
  let sortString = "";
  let filterString = "";

  if (filters) {
    if (filters.price !== "none" && filters.price) {
      sortString = "sort:[";

      sortString += `"Price:${filters.price}"`;

      sortString += "]";
    }

    if (filters.size !== "all" && filters.size) {
      filterString += `, Sizes: { Label : eq: "${filters.size}"}}`;
    }
    if (filters.instock) {
      filterString += `, in_stock: {eq: ${filters.instock}}`;
    }
  }

  return {
    filterString,
    sortString,
  };
};

export const getProductsDataByCategorySlug = async (
  slug: string,
  page: number = 1,
  pageSize: number = 1,
  filters?: ProductFilters
) => {
  const generatedFilters = makeFilterString(filters);

  const response = await client(null).query({
    query: FIND_PRODUCT_BY_CAT_SLUG(
      generatedFilters.filterString,
      generatedFilters.sortString
    ),

    variables: {
      slug: slug,
      page: page,
      pageSize: pageSize,
    },
  });

  return response as ProductProps;
};

export const getProductsDataByTag = async (
  slug: string,
  page: number = 1,
  pageSize: number = 10,
  filters?: ProductFilters
) => {
  const generatedFilters = makeFilterString(filters);

  const response = await client(null).query({
    query: FIND_PRODUCT_BY_TAG(
      generatedFilters.filterString,
      generatedFilters.sortString
    ),
    variables: {
      slug: slug,
      page: page,
      pageSize: pageSize,
    },
  });

  return response as ProductProps;
};
export const getProductsById = async (
  ids: number[],
  filters?: ProductFilters
) => {
  const generatedFilters = makeFilterString(filters);

  const response = await client(null).query({
    query: GET_PRODUCTS_BY_ID(
      generatedFilters.filterString,
      generatedFilters.sortString
    ),
    variables: {
      ids: ids,
    },
  });

  return response as ProductProps;
};
