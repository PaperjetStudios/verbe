import { atom } from "jotai";
import _ from "lodash";

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
