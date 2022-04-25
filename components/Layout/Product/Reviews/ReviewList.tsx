import { Box, Text } from "@chakra-ui/react";
import React, { Component } from "react";
import { Review } from "../../../../data/reviews/types";

import ReviewItem from "./ReviewItem";

import styles from "./ReviewList.module.scss";

type ReviewListProps = {
  reviews: { attributes: Review }[];
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <Box className={styles.container}>
      {reviews.map((review, ind: number) => {
        return <ReviewItem key={`review_${ind}`} review={review.attributes} />;
      })}
      <Box pt="6"></Box>
    </Box>
  );
};

export default ReviewList;
