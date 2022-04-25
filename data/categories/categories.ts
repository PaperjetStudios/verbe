import { gql } from "@apollo/client";
import client from "../../config/api";

import { GET_CATEGORIES, GET_CATEGORY_BY_SLUG } from "./queries";

export const getCategoryDataBySlug = async (slug: string) => {
  const response = await client(null).query({
    query: GET_CATEGORY_BY_SLUG,
    variables: {
      slug: slug,
    },
  });

  return response.data.categories.data[0];
};

export const getCategories = async () => {
  const response = await client(null).query({
    query: GET_CATEGORIES,
  });

  return response.data.categories.data;
};
