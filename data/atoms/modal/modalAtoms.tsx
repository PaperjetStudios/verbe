import produce from "immer";
import { atom } from "jotai";
import _ from "lodash";
import modal_keys from "../../../components/Modal/keys";

export type SingleModalProps = {
  onOpen?: () => {};
  onClose?: () => {};
  isOpen: boolean;
  name: string;
};

const emptyStore = Object.entries(modal_keys).map((mod) => {
  return {
    isOpen: false,
    name: mod[1],
  };
});

export const Modals = atom<SingleModalProps[]>(emptyStore);

export const findModalIndexByName = (
  state: SingleModalProps[],
  name: string
) => {
  return _.findIndex(state, (mod) => {
    return mod.name === name;
  });
};

type toggleArgs = {
  name: string;
  toggle: boolean;
};

export const ToggleModal = atom(
  (get) => get(Modals),
  (get, set, args: toggleArgs) => {
    const { name, toggle } = args;
    let modals = get(Modals);
    const index = findModalIndexByName(modals, name);

    modals = produce(get(Modals), (draft) => {
      draft[index].isOpen = toggle;
    });
    set(Modals, modals);
  }
);
