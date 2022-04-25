import { gql } from "@apollo/client";
import client from "../../config/api";

import { GET_TAGS, GET_TAG_BY_SLUG } from "./queries";

export const getTagDataBySlug = async (slug: string) => {
  const response = await client(null).query({
    query: GET_TAG_BY_SLUG,
    variables: {
      slug: slug,
    },
  });

  return response.data.tags.data[0];
};

export const getTags = async () => {
  const response = await client(null).query({
    query: GET_TAGS,
  });

  return response.data.tags.data;
};
