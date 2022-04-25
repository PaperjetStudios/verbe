import produce from "immer";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import _ from "lodash";
import { parseAsInt } from "../../../config/util";
import { SingleProduct } from "../../products/types";

import { AddressRequiredBool } from "../checkout/checkoutAtoms";

import { CartItem, CartItems, emptyTotals, Totals } from "./types";

export const DeliveryMethodKeys = {
  paxi: 1,
  pickup: 2,
  aramex: 3,
};

// ITEMS
export const Items = atomWithStorage<CartItems[]>("cart", []);

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

    // Store
    const Store = -1;
    const StoreId = 0;
    const DeliveryMethods = null;

    // Get inital cart
    let Cart = cart;

    // Get which store in the index it is
    const StoreIndex = _.findIndex(Cart, (stores: CartItems) => {
      return stores?.store === StoreId;
    });

    // if item exists in the cart
    const existing = _.findIndex(Cart[StoreIndex]?.items, (item: CartItem) => {
      return item.Product.data.id === Id;
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

      // Check if there haven't been any products added to this store yet
      if (StoreIndex === -1) {
        // create the entry
      } else {
        // if there is an existing product, update it, if not, add a new one
        Cart = produce(Cart, (draft) => {
          if (existing !== -1) {
            draft[StoreIndex].items[existing] = newProductData;
          } else {
            draft[StoreIndex].items.push(newProductData);
          }
        });
      }
    } else {
      // We are removing it rather
      /////////////////////////////////
      if (StoreIndex !== -1 && existing !== -1) {
        Cart = produce(Cart, (draft) => {
          // delete the entry if there's only one in the entry
          if (draft[StoreIndex].items.length === 1) {
            draft.splice(StoreIndex, 1);
          } else {
            draft[StoreIndex].items.splice(existing, 1);
          }
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
  store: number;
  product: number;
  quantity: number;
};

export const updateItemQuantity = atom(
  (get) => get(Items),
  (get, set, data: updateItemQuantityProps) => {
    let Cart = get(Items);
    const { store, product, quantity } = data;

    Cart = produce(Cart, (draft) => {
      draft[store].items[product].Quantity = quantity;
    });
    set(Items, Cart);
    set(Total, calculateTotals(Cart));
  }
);

// ITEMS - COUNT

export const CartCount = atom((get) => {
  const items = get(Items);
  let count = 0;
  _.each(items, (store) => {
    count += store.items.length;
  });

  return count;
});
// ITEMS - REMOVE ITEM

type removeItemProps = {
  store: number;
  product: number;
};

export const removeItem = atom(
  (get) => get(Items),
  (get, set, data: removeItemProps) => {
    let Cart = get(Items);
    const { store, product } = data;
    Cart = produce(Cart, (draft) => {
      // delete the entry if there's only one in the entry
      if (draft[store].items.length === 1) {
        draft.splice(store, 1);
      } else {
        draft[store].items.splice(product, 1);
      }
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

  items.forEach((Items) => {
    Items.items.forEach((Item) => {
      const productPrice =
        Item.Quantity *
        parseAsInt(
          Item.Product.data.attributes.Variation[Item.Variation].Price
        );

      totals.total_items = totals.total_items + productPrice;

      totals.total = totals.total + productPrice;
    });
    const deliveryPrice = Items.selectedDelivery.option.Cost;
    totals.delivery = totals.delivery + deliveryPrice;
    totals.total = totals.total + deliveryPrice;
  });
  return totals;
};
