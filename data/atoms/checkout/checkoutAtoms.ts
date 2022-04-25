import produce from "immer";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import _ from "lodash";
import { empty, FormType } from "../../user/guest-info";

// Guest info
export const GuestCheckout = atomWithStorage<{ guestInfo: FormType }>(
  "guestInfo",
  { guestInfo: empty }
);
export const AddressSelection = atomWithStorage<number>("addressSelection", -1);

export const SetAddress = atom(
  (get) => get(AddressSelection),
  (get, set, data: number) => {
    set(AddressSelection, data);
  }
);

export const AddressRequiredBool = atomWithStorage<boolean>(
  "AddressRequired",
  false
);

export const AddressRequired = atom(
  (get) => get(AddressRequiredBool),
  (get, set, data: boolean) => {
    set(AddressRequiredBool, data);
  }
);

export const WalletPayment = atom<number>(0);

export const SetWalletPayment = atom(
  (get) => get(WalletPayment),
  (get, set, data: number) => {
    set(WalletPayment, data);
  }
);

// Order Group
type OrderGroup = {
  Unique: string;
  parsedWalletAmount: number;
  Total: number;
};
const emptyOrderGroup = {
  Unique: "",
  parsedWalletAmount: 0,
  Total: 0,
};
export const OrderGroup = atom<OrderGroup>({
  ...emptyOrderGroup,
});
export const SetOrderGroup = atom(
  (get) => get(OrderGroup),
  (get, set, data: OrderGroup) => {
    set(OrderGroup, data);
  }
);

/*

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
*/
