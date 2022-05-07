import produce from "immer";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import _ from "lodash";
import { calculateTotals, Items, Total } from "../cart/cartAtoms";
import { CheckoutSettings } from "../checkout/checkoutAtoms";
import { Coupon } from "./types";

// CouponAtom
export const CouponAtom = atomWithStorage<Coupon | null>("CouponAtom", null);

export const SetCoupon = atom(
  (get) => {
    return get(CouponAtom);
  },
  (get, set, coupon: Coupon | null) => {
    set(CouponAtom, coupon);

    set(Total, calculateTotals(get(Items), get(CheckoutSettings), coupon));
  }
);
