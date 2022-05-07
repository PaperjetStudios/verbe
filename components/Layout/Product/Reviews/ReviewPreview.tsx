import { Box, Text } from "@chakra-ui/react";
import React, { Component } from "react";
import { Icons } from "../../../Common/icons";

import styles from "./ReviewPreview.module.scss";

type ReviewPreviewProps = {
  rating: number | string;
  hideReviews?: boolean;
  reviews: number;
};

const ReviewPreview: React.FC<ReviewPreviewProps> = ({
  rating,
  hideReviews,
  reviews,
}) => {
  const setRating = typeof rating === "string" ? parseInt(rating) : rating;

  if (setRating === -1 || reviews === 0) {
    return (
      <Box className={styles.container}>
        <Text fontSize="sm" color="#666">
          No Reviews Yet!
        </Text>
      </Box>
    );
  }

  let elements = [];
  for (let i = 1; i < 6; i++) {
    if (i > setRating) {
      elements.push(
        <Box key={"star-" + i} className={styles.filledStar}>
          {Icons.star}
        </Box>
      );
    } else {
      elements.push(
        <Box key={"star-" + i} className={styles.emptyStar}>
          {Icons.starFilled}
        </Box>
      );
    }
  }

  return (
    <Box className={styles.container}>
      {elements}
      {!hideReviews && reviews && (
        <Text
          pl={[0, null, null, 2]}
          fontWeight="bold"
          fontSize="xs"
          color="#ccc"
        >
          ({reviews} Reviews)
        </Text>
      )}
    </Box>
  );
};

export default ReviewPreview;
