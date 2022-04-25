import { Button, useDisclosure } from "@chakra-ui/react";
import { useAtom } from "jotai";
import _, { reduce } from "lodash";
import React, { Component } from "react";
import { ToggleModal } from "../../../../data/atoms/modal/modalAtoms";
import { Review } from "../../../../data/reviews/types";
import useUser from "../../../../hooks/useUser";
import FormReviewAdd from "../../../form/review-add";
import modal_keys from "../../../Modal/keys";
import ModalBase from "../../../Modal/ModalBase";

type ReviewSummaryProps = {
  reviews: { attributes: Review }[];
  extraProps: any;
  id: string | number;
  onSuccess: () => any;
  type: "Product" | "Store";
};

const ReviewWrite: React.FC<ReviewSummaryProps> = ({
  id,
  extraProps,
  onSuccess,
  type,
}) => {
  const modal = useDisclosure();

  const { isLoggedIn } = useUser();

  const [_, toggleModal] = useAtom(ToggleModal);

  if (!isLoggedIn) {
    return (
      <Button
        onClick={() => {
          toggleModal({ name: modal_keys.login_to_continue, toggle: true });
        }}
        {...extraProps}
        variant="main"
      >
        Write a Review
      </Button>
    );
  }

  return (
    <>
      <Button {...extraProps} onClick={modal.onOpen} variant="main">
        Write a Review
      </Button>
      <ModalBase
        hideFooter={true}
        disclosure={modal}
        trigger="general"
        heading="Write a Review"
        message={" "}
      >
        <FormReviewAdd
          onSuccess={() => {
            modal.onClose();
            onSuccess();
          }}
          type={type}
          id={id}
        />
      </ModalBase>
    </>
  );
};

export default ReviewWrite;
