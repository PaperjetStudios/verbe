import client from "../../config/api";
import { GET_REVIEWS } from "./queries";
import { Review } from "./types";

export type ReviewData = {
  data: {
    attributes: Review;
  };
};
export type CreateReviewDataType = {
  createReviewAndAggregate: ReviewData;
};

export type ReviewsDataType = {
  reviews: {
    data: {
      attributes: Review;
    }[];
    meta: {
      pagination: {
        page: number;
        pageCount: number;
        pageSize: number;
        total: number;
      };
    };
  };
};

export const getReviewsData = async (
  by: "Product",
  id: string | number,
  page: number,
  perPage: number
) => {
  const data = await client(null).query<ReviewsDataType>({
    query: GET_REVIEWS(by, id),
    variables: { page: page, perPage: perPage },
  });

  return data;
};
