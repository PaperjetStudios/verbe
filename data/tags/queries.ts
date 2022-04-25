import { gql } from "@apollo/client";

export const BASE_TAG = gql`
  fragment BASE_TAG on Tag {
    Title
    slug
  }
`;

export const GET_TAG_BY_SLUG = gql`
  ${BASE_TAG}
  query ($slug: String!) {
    tags(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          ...BASE_TAG
        }
      }
    }
  }
`;

export const GET_TAGS = gql`
  ${BASE_TAG}
  query {
    tags {
      data {
        id
        attributes {
          ...BASE_TAG
        }
      }
    }
  }
`;
