import produce from "immer";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import _ from "lodash";
import { parseAsInt } from "../../../config/util";
import { SingleProduct } from "../../products/types";

import { AddressRequiredBool } from "../checkout/checkoutAtoms";

import { CartItem, CartItems, emptyTotals, Totals } from "./types";

// ITEMS
export const Items = atomWithStorage<CartItems>("cart", []);

export const clearCart = atom(
  (get) => get(Items),
  (get, set, data: any) => {
    set(AddressRequiredBool, false);
    set(Items, []);
    set(Total, calculateTotals([]));
  }
);

type UpdateCartProps = {
  product: { data: SingleProduct };
  quantityValue: number;
  variationValue: number;
  showCartAfter: boolean;
};

export const updateCart = atom(
  (get) => get(Items),
  (get, set, data: UpdateCartProps) => {
    const cart = get(Items) ? get(Items) : [];

    const { product, quantityValue, variationValue, showCartAfter } = data;
    // Get Product Data
    const Attributes = product.data.attributes;
    const Id = product.data.id;

    // Variations
    const VariationData = Attributes.Variation[variationValue];
    const VariationQuantity = parseAsInt(VariationData.Quantity);

    // Get inital cart
    let Cart = cart;

    // if item exists in the cart
    const existing = _.findIndex(Cart, (item: CartItem) => {
      return item.Product.data.id === Id && item.Variation === variationValue;
    });

    // check if we aren't removing
    /////////////////////////////////

    if (quantityValue !== -1) {
      // Make sure there is enough product
      let finalQuantity = quantityValue;
      if (quantityValue > VariationQuantity) {
        finalQuantity = VariationQuantity;
      }
      // Create new Product Data
      const newProductData = {
        Product: product,
        Variation: variationValue,
        Quantity: finalQuantity,
        Extra: null,
      };

      // Set initial Delivery Method as Pickup

      // if there is an existing product, update it, if not, add a new one
      Cart = produce(Cart, (draft) => {
        if (existing !== -1) {
          draft[existing] = newProductData;
        } else {
          draft.push(newProductData);
        }
      });
    } else {
      // We are removing it rather
      /////////////////////////////////
      if (existing !== -1) {
        Cart = produce(Cart, (draft) => {
          draft.splice(existing, 1);
        });
      }
    }
    if (showCartAfter) {
      toggleDrawerFunction(get, set, true);
      //  set(cartDrawerShowing, true);
    }
    set(Items, Cart);
    set(Total, calculateTotals(Cart));
  }
);

// ITEMS - UPDATE QUANTITY

type updateItemQuantityProps = {
  product: number;
  quantity: number;
};

export const updateItemQuantity = atom(
  (get) => get(Items),
  (get, set, data: updateItemQuantityProps) => {
    let Cart = get(Items);
    const { product, quantity } = data;

    Cart = produce(Cart, (draft) => {
      draft[product].Quantity = quantity;
    });
    set(Items, Cart);
    set(Total, calculateTotals(Cart));
  }
);

// ITEMS - COUNT

export const CartCount = atom((get) => {
  const items = get(Items);

  return items.length;
});
// ITEMS - REMOVE ITEM

type removeItemProps = {
  product: number;
};

export const removeItem = atom(
  (get) => get(Items),
  (get, set, data: removeItemProps) => {
    let Cart = get(Items);
    const { product } = data;
    Cart = produce(Cart, (draft) => {
      draft.splice(product, 1);
    });

    set(Items, Cart);
    set(Total, calculateTotals(Cart));
  }
);

/// SHOWING
export const cartDrawerShowing = atomWithStorage<boolean>(
  "cart_showing",
  false
);

export const toggleDrawer = atom(
  (get) => get(cartDrawerShowing),
  (get, set, toggle: boolean | null) => {
    toggleDrawerFunction(get, set, toggle);
  }
);

export const toggleDrawerFunction = (get, set, toggle) => {
  const toggled = toggle !== null ? toggle : !get(cartDrawerShowing);

  set(cartDrawerShowing, toggled);
};

/// UNLOCKED STEPS
export const unlockedSteps = atomWithStorage<number>(
  "checkout_unlocked_steps",
  2
);

export const unlockStep = atom(
  (get) => {
    return get(unlockedSteps);
  },
  (get, set, step: number) => {
    set(unlockedSteps, step);
  }
);

/// TOTALS
export const Total = atomWithStorage<Totals>("cart_totals", emptyTotals);

export const calculateTotals = (items) => {
  let totals: Totals = {
    total_items: 0,
    delivery: 0,
    vat: 0,
    total: 0,
  };

  items.forEach((item) => {
    const productPrice =
      item.Quantity * parseAsInt(item.Product.data.attributes.Price);

    totals.total_items = totals.total_items + productPrice;

    totals.total = totals.total + productPrice;
  });
  const deliveryPrice = 0; // TODO ADD IN
  totals.delivery = totals.delivery + deliveryPrice;
  totals.total = totals.total + deliveryPrice;

  return totals;
};
