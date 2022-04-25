import produce from "immer";
import { atom } from "jotai";
import _ from "lodash";

export type SearchModalProps = {
  onOpen?: () => {};
  onClose?: () => {};
  isOpen: boolean;
};

export const SearchModal = atom<SearchModalProps>({ isOpen: false });
export const SearchText = atom<string>("");

export const ToggleSearchModal = atom(
  (get) => {
    return get(SearchModal);
  },
  (get, set, update: boolean) => {
    set(
      SearchModal,
      produce(get(SearchModal), (draft) => {
        draft.isOpen = update;
      })
    );
  }
);
export const SetSearchText = atom(
  (get) => {
    return get(SearchText);
  },
  (get, set, update: string) => {
    set(SearchText, update);
  }
);
