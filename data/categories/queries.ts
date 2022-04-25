import { gql } from "@apollo/client";

export const BASE_CATEGORY = gql`
  fragment BASE_CATEGORY on Category {
    Title
    Image {
      data {
        id
        attributes {
          url
        }
      }
    }
    slug
  }
`;

export const GET_CATEGORY_BY_SLUG = gql`
  ${BASE_CATEGORY}
  query ($slug: String!) {
    categories(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          ...BASE_CATEGORY
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  ${BASE_CATEGORY}
  query {
    categories {
      data {
        id
        attributes {
          ...BASE_CATEGORY
        }
      }
    }
  }
`;
