import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const MobileMenuShowing = atomWithStorage("mobile-menu", false);

export const toggleMobileMenu = atom(
  (get) => get(MobileMenuShowing),
  (get, set, data: boolean) => {
    set(MobileMenuShowing, data);
  }
);
