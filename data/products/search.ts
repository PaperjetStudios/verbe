import { gql } from "@apollo/client";
import client from "../../config/api";

import { makeFilterString } from "./products";
import { PRODUCT_FRAGMENT } from "./queries";
import { ProductFilters, ProductProps } from "./types";

export const SEARCH_PRODUCTS = (
  filterString: string,
  sortString: string
) => gql`
    ${PRODUCT_FRAGMENT}
    query ($search: String) {
      products(
        ${sortString}
        pagination:{limit:10}
        filters: {   or: [{Title: {containsi: $search}}, {Categories: {Title: {containsi:$search }}}  ] ${filterString} }
      ) {
        data {
          ...PRODUCT_FRAGMENT
        }
      }
    }
  `;

export const searchForProducts = async (
  search: string,
  filters?: ProductFilters
) => {
  const generatedFilters = makeFilterString(filters);

  const response = await client(null).query({
    query: SEARCH_PRODUCTS(
      generatedFilters.filterString,
      generatedFilters.sortString
    ),
    variables: {
      search: search,
    },
  });

  return response as ProductProps;
};
