import { useAtom } from "jotai";
import _ from "lodash";
import { useState } from "react";
import { axiosInstance } from "../../../../../config/api";
import { Items, Total } from "../../../../../data/atoms/cart/cartAtoms";
import {
  AddressSelection,
  GuestCheckout,
} from "../../../../../data/atoms/checkout/checkoutAtoms";
import {
  CouponAtom,
  SetCoupon,
} from "../../../../../data/atoms/coupon/couponAtoms";
import { OrderData } from "../../../../../data/orders/types";
import useUser from "../../../../../hooks/useUser";

export type Props = {};
export type Response = {
  errors?: any[];
};

export default function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const { isLoggedIn, user } = useUser();
  const [guestInfo] = useAtom(GuestCheckout);
  const [selectedAddress] = useAtom(AddressSelection);

  const [cart] = useAtom(Items);
  const [total] = useAtom(Total);
  const [coupon, setCoupon] = useAtom(SetCoupon);

  const createOrder = () => {
    const order: OrderData = {
      Items: cart,
      Total: total.total,
      Total_Delivery: total.delivery,
      Total_Items: total.total_items,
      Total_Discount: total.discount,
      Delivery_Address: getDeliveryAddress(
        isLoggedIn,
        user,
        selectedAddress,
        guestInfo.guestInfo
      ),
      User_Info: getUserInfo(isLoggedIn, user, guestInfo.guestInfo),
      Coupon: coupon,
    };
    console.log(order);

    setLoading(true);

    return axiosInstance()(`/orderutils/`, {
      method: "post",
      data: order,
    })
      .then((response) => {
        if (response.data.errors) {
          setLoading(false);
        } else {
          setOrderData(response.data);
          setCoupon(null);
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
    orderData,
  };
}

export function getDeliveryAddress(
  isLoggedIn,
  user,
  selectedAddress,
  guestInfo
) {
  if (isLoggedIn) {
    return user.user.Address[selectedAddress];
  } else {
    return {
      Street_Address_1: guestInfo.Street_Address_1,
      Street_Address_2: guestInfo.Street_Address_2,
      Suburb: guestInfo.Suburb,
      Province: guestInfo.Province,
      City: guestInfo.City,
      Country: guestInfo.Country,
      Zip_Code: guestInfo.Zip_Code,
    };
  }
}

export function getUserInfo(isLoggedIn, user, guestInfo) {
  if (isLoggedIn) {
    return _.omit(user.user, [
      "updatedAt",
      "Wishlist",
      "blocked",
      "confirmed",
      "Address",
      "createdAt",
    ]);
  } else {
    return {
      email: guestInfo.email,
      Phone: guestInfo.Phone,
      LastName: guestInfo.LastName,
      FirstName: guestInfo.FirstName,
      password: guestInfo.password,
      communications: guestInfo.communications,
      create_profile_check: guestInfo.create_profile_check,
    };
  }
}
