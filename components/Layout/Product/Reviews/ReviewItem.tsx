import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { makeDate } from "../../../../config/util";
import { Review } from "../../../../data/reviews/types";

import styles from "./ReviewItem.module.scss";
import ReviewPreview from "./ReviewPreview";

type ReviewItemProps = {
  review: Review;
};

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <>
      <Box className={styles.container} py={5}>
        <HStack alignItems={"center"}>
          <Text fontSize="sm" color="#000" lineHeight={1} fontWeight="500">
            {review.Username}
          </Text>
          <Text fontSize="xs" color="#AAA" lineHeight={0.5}>
            {makeDate(review.createdAt)}
          </Text>
        </HStack>
        <HStack alignItems={"center"} py="2">
          <ReviewPreview
            reviews={5}
            hideReviews={true}
            rating={review.Rating}
          />
          <Text fontWeight={"bold"}>{review.Title}</Text>
        </HStack>
        <Text fontSize="sm">{review.Message}</Text>
      </Box>
      <Divider />
    </>
  );
};

export default ReviewItem;
