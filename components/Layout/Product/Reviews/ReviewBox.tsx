import { Box, Stack, Text } from "@chakra-ui/react";
import React, { Component, useEffect, useState } from "react";

import { useQuery } from "react-query";

import ReviewList from "./ReviewList";
import ReviewSummary from "./ReviewSummary";
import ReviewWrite from "./ReviewWrite";

import _ from "lodash";
import Router from "next/router";
import useUser from "../../../../hooks/useUser";
import { getReviewsData } from "../../../../data/reviews/data";
import Loader from "../../../Common/Loader/Loader";
import { parseAsInt } from "../../../../config/util";
import Pagination from "../../Pagination/Pagination";

type ReviewBoxProps = {
  id: number | string;
  type: "Product";
  ratingTotal: number;
  rating: number;
  reviews: any[];
  canReview: boolean;
};

const ReviewBox: React.FC<ReviewBoxProps> = ({
  id,
  type,
  ratingTotal,
  rating,
  reviews,
  canReview = true,
}) => {
  const [currentPage, setCurrent] = useState(1);
  const { user } = useUser();

  const { data, isLoading, refetch } = useQuery(`review-data-${id}`, () =>
    getReviewsData(type, id, currentPage, 3)
  );

  useEffect(() => {
    const refetchQuery = async () => {
      const data = await refetch();
    };
    refetchQuery();
  }, [currentPage, refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <></>;
  }

  const pagination = data.data.reviews.meta.pagination;

  const hasWrittenReview = _.filter(reviews, (review: any, index) => {
    return parseAsInt(user?.user?.id) === parseAsInt(review.attributes.UserId);
  });

  const reviewTotal = reviews.length;

  const writeButton = (
    <>
      {canReview && (
        <ReviewWrite
          onSuccess={() => {
            Router.reload();
          }}
          reviews={reviews}
          id={id}
          type={type}
          extraProps={{ mt: [5, null, null, 8] }}
        ></ReviewWrite>
      )}
    </>
  );

  if (reviewTotal === 0) {
    return (
      <Stack
        spacing={5}
        p={6}
        border={"1px solid #eee"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Text fontSize="sm" color="#666">
          No Reviews Yet!
        </Text>
        {writeButton}
      </Stack>
    );
  }

  return (
    <Box>
      <ReviewSummary
        ratingTotal={ratingTotal}
        rating={rating}
        reviews={reviews}
        id={id}
      />
      {hasWrittenReview.length === 0 && <>{writeButton}</>}
      <Box mt={3}>
        <ReviewList reviews={data.data.reviews.data} />
        <Pagination
          settings={pagination}
          page={currentPage}
          setPage={(ind) => {
            setCurrent(ind);
          }}
        />
      </Box>
    </Box>
  );
};

export default ReviewBox;
