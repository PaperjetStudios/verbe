import { atom } from "jotai";
import _ from "lodash";

export type ConditionFilterProps = "none" | "Used" | "New";
export type PriceFilterProps = "none" | "asc" | "desc";

export const ConditionFilterStatus = atom<ConditionFilterProps>("none");
export const PriceFilterStatus = atom<PriceFilterProps>("none");

export const ConditionFilter = atom(
  (get) => {
    return get(ConditionFilterStatus);
  },
  (get, set, update) => {
    set(ConditionFilterStatus, update);
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
