import { useAtom } from "jotai";
import { omit } from "lodash";
import { useState } from "react";
import { axiosInstance } from "../../../../../config/api";
import { Items } from "../../../../../data/atoms/cart/cartAtoms";
import {
  GuestCheckout,
  SetAddress,
} from "../../../../../data/atoms/checkout/checkoutAtoms";
import useUser from "../../../../../hooks/useUser";

export type Props = {};
export type Response = {
  errors?: any[];
};

export default function useCheckout() {
  const [items] = useAtom(Items);
  const [guest] = useAtom(GuestCheckout);
  const [selectedAddress] = useAtom(SetAddress);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, user } = useUser();

  //const [orderGroup, setOrderGroup] = useAtom(SetOrderGroup);

  const createOrder = (continueAnyway, errorCallback) => {
    const data = {
      cart: items,

      user: isLoggedIn ? user.user.id : -1,
      guest: isLoggedIn
        ? null
        : guest.guestInfo
        ? { ...guest.guestInfo, guestProfile: true }
        : null,
      addressRequired: true,
      address: isLoggedIn
        ? omit(user.user.Address[selectedAddress], "__typename")
        : null,

      continueAnyway: continueAnyway,
    };

    setLoading(true);

    return axiosInstance()(`/transactions/createMyOrder`, {
      method: "post",
      data: data,
    })
      .then((response) => {
        if (response.data.newOrder.errors) {
          errorCallback(response.data.newOrder);
          setLoading(false);
        } else {
          // setOrderGroup(response.data.newOrder.orderGroup);
          // callback(response.data.newOrder);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("An error occurred:", error);
      });
  };

  return {
    createOrder,
    loading,
  };
}
