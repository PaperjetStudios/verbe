import { atom } from "jotai";
import _ from "lodash";
import { StatusProps } from "../../orders/types";

export type SizeFilterProps = "all" | "S" | "M" | "L" | "XL" | "XXL";
export type PriceFilterProps = "none" | "asc" | "desc";

export const SizeFilterStatus = atom<SizeFilterProps>("all");
export const PriceFilterStatus = atom<PriceFilterProps>("none");

export const SizeFilter = atom(
  (get) => {
    return get(SizeFilterStatus);
  },
  (get, set, update) => {
    set(SizeFilterStatus, update);
  }
);

export const PriceFilter = atom(
  (get) => {
    return get(PriceFilterStatus);
  },
  (get, set, update) => {
    set(PriceFilterStatus, update);
  }
);

// ORDERS
export const OrderStatusFilterData = atom<StatusProps | "All">("All");
export const OrderSearchFilterData = atom<string>("");

export const OrderStatusFilter = atom(
  (get) => {
    return get(OrderStatusFilterData);
  },
  (get, set, update: StatusProps) => {
    set(OrderStatusFilterData, update);
  }
);

export const OrderSearchFilter = atom(
  (get) => {
    return get(OrderSearchFilterData);
  },
  (get, set, update) => {
    set(OrderSearchFilterData, update);
  }
);
