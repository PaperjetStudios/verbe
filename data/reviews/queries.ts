import { gql } from "@apollo/client";

export const BASE_REVIEW = gql`
  fragment BASE_REVIEW on Review {
    Message
    Rating
    Title
    Username
    UserId
    createdAt
  }
`;

export const CREATE_REVIEW = gql`
  ${BASE_REVIEW}
  mutation ($data: ReviewInput!) {
    createReviewAndAggregate(data: $data) {
      data {
        id
        attributes {
          ...BASE_REVIEW
        }
      }
    }
  }
`;

export const GET_REVIEWS = (
  by: "Product" = "Product",
  id: string | number = "0"
) => {
  //BUILD FILTERS
  let filters = "";

  if (by === "Product") {
    filters += `Product:{id: {eq:"${id}"}}`;
  }

  return gql`
  ${BASE_REVIEW}
  query (
    $page: Int
    $perPage: Int
  ) {
    reviews(
      pagination: { page: $page, pageSize: $perPage }
      filters: {
       ${filters}
      }
    ) {
      meta {
        pagination {
          total
          pageCount
          pageSize
          page
        }
      }
      data {
        id
        attributes {
        ...BASE_REVIEW
        }
      }
    }
  }
`;
};
