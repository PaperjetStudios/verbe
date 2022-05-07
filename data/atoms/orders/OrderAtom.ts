import { atom } from "jotai";

export const Order = atom(null);
export const SetOrder = atom(
  (get) => get(SetOrder),
  (get, set, data) => {
    set(SetOrder, data);
  }
);
