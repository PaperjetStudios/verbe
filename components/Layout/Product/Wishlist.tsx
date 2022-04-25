import { Box, IconButton, Input } from "@chakra-ui/react";
import React, { Component, useEffect, useState } from "react";

import { produce } from "immer";

import _ from "lodash";
import { parseAsInt } from "../../../config/util";

import { useAtom } from "jotai";
import useUser from "../../../hooks/useUser";
import { ToggleModal } from "../../../data/atoms/modal/modalAtoms";
import modal_keys from "../../Modal/keys";
import { Icons } from "../../Common/icons";

type WishlistProps = {
  id: number | string;
  className?: any;
  variant?: "outline" | "transparent";
  size?: "sm" | "lg";
};

const searchWishlist = (list: any, id: number | string) => {
  const find = _.findIndex(list, (item) => {
    return parseAsInt(id) === item;
  });
  return find;
};

const toggleWishlist = (list: any, id: number | string) => {
  const index = searchWishlist(list, id);

  if (index !== -1) {
    return produce(list, (draft: any) => {
      draft.splice(index, 1);
    });
  } else {
    return produce(list, (draft: any) => {
      draft.push(parseAsInt(id));
    });
  }
};
const Wishlist: React.FC<WishlistProps> = ({
  id,
  variant = "outline",
  size = "lg",
  className = "",
}) => {
  const { isLoggedIn, userMutation, user } = useUser();

  const [_, toggleModal] = useAtom(ToggleModal);

  const [isInWishList, setInWishList] = useState(false);

  const setWishlist = async (toggle: boolean) => {
    if (isLoggedIn) {
      const newWishlist = toggleWishlist(
        user?.user.Wishlist ? user.user.Wishlist : [],
        id
      );
      userMutation.mutate({ Wishlist: newWishlist });
    } else {
      toggleModal({ name: modal_keys.login_to_continue, toggle: true });
    }
  };

  useEffect(() => {
    const found = searchWishlist(
      user?.user?.Wishlist ? user.user.Wishlist : [],
      id
    );

    setInWishList(isLoggedIn ? found !== -1 : false);
  }, [user, isLoggedIn, id]);

  return (
    <>
      <IconButton
        className={className}
        isLoading={userMutation.isLoading}
        variant={variant}
        size={size}
        icon={isInWishList ? Icons.heartSolid : Icons.heart}
        aria-label="Wishlist"
        onClick={() => setWishlist(!isInWishList)}
      />
    </>
  );
};

export default Wishlist;
