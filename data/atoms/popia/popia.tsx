import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import _ from "lodash";

// ITEMS
export const Popia = atomWithStorage<boolean>(
  process.env.NEXT_PUBLIC_PREFIX + "_popia",
  false
);

export const setPopia = atom(
  (get) => get(Popia),
  (get, set, data: boolean) => {
    set(Popia, data);
  }
);
