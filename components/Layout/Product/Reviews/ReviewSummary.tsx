import { Box, Button, HStack, Progress, Stack, Text } from "@chakra-ui/react";
import _, { reduce } from "lodash";
import React, { Component } from "react";
import { Review } from "../../../../data/reviews/types";

import ReviewPreview from "./ReviewPreview";

import styles from "./ReviewSummary.module.scss";

type ReviewSummaryProps = {
  reviews: { attributes: Review }[];
  rating: number;
  ratingTotal: any;
  id: string | number;
};

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  reviews,
  id,
  rating,
  ratingTotal,
}) => {
  let ratingElements = [];

  const reviewTotal = reviews.length;

  if (reviewTotal > 0 && ratingTotal) {
    for (let i = 1; i < 6; i++) {
      ratingElements.push(
        <HStack key={`revie_tot_${i}`} alignItems={"center"} spacing={10}>
          <Text fontSize={"xs"}>{i} Star</Text>
          <Progress
            marginInlineStart={10}
            flex={1}
            display="block"
            colorScheme={"ratings"}
            value={(100 / reviewTotal) * (ratingTotal[i] ? ratingTotal[i] : 0)}
          />
        </HStack>
      );
    }
  }
  return (
    <>
      <HStack pt={5} spacing={10} className={styles.container}>
        <Stack w="30%" spacing={3}>
          {_.reverse(ratingElements)}
        </Stack>
        <Stack w="30%">
          <Stack
            spacing={0}
            p={6}
            border={"1px solid #eee"}
            justifyContent="center"
            alignItems={"center"}
          >
            {reviewTotal > 0 && (
              <>
                <Text fontSize="sm" mb={1}>
                  {reviewTotal} Review{reviewTotal > 1 ? "s" : ""}
                </Text>
                <Text
                  fontSize={"3xl"}
                  pb={2}
                  fontWeight="bold"
                  lineHeight={"1.1"}
                >
                  {rating}
                </Text>
              </>
            )}
            <ReviewPreview
              reviews={reviewTotal}
              rating={rating}
              hideReviews={true}
            />
          </Stack>
        </Stack>
      </HStack>
    </>
  );
};

export default ReviewSummary;
