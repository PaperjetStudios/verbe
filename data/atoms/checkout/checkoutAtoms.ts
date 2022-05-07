import produce from "immer";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import _ from "lodash";
import { empty, FormType } from "../../user/guest-info";
import { checkoutSettings } from "./types";

// Guest info
export const GuestCheckout = atomWithStorage<{ guestInfo: FormType }>(
  "guestInfo",
  { guestInfo: empty }
);

// Address
export const AddressSelection = atomWithStorage<number>("addressSelection", -1);
export const SetAddress = atom(
  (get) => get(AddressSelection),
  (get, set, data: number) => {
    set(AddressSelection, data);
  }
);

// Checkout settings
export const CheckoutSettings = atomWithStorage<{ settings: checkoutSettings }>(
  "checkoutSettings",
  {
    settings: {
      debug: false,
      shipping_cost: "0",
      free_shipping_limit: "0",
      free_shipping_enabled: false,
    },
  }
);

export const SetCheckoutSettings = atom(
  (get) => get(CheckoutSettings),
  (get, set, data: checkoutSettings) => {
    set(CheckoutSettings, { settings: data });
  }
);
