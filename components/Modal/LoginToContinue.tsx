import { Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import Router from "next/router";
import {
  findModalIndexByName,
  ToggleModal,
} from "../../data/atoms/modal/modalAtoms";
import modal_keys from "./keys";
import ModalBase from "./ModalBase";

const ModalLoginToContinue: React.FC = () => {
  const [modals, toggleModal] = useAtom(ToggleModal); //(modal_keys.login_to_continue);

  const modal =
    modals[findModalIndexByName(modals, modal_keys.login_to_continue)];
  return (
    <>
      <ModalBase
        trigger="login_to_continue"
        disclosure={{
          isOpen: modal.isOpen,
          onClose: () =>
            toggleModal({ name: modal_keys.login_to_continue, toggle: false }),
        }}
        actions={[
          {
            label: "Login",
            onClick: () => {
              toggleModal({
                name: modal_keys.login_to_continue,
                toggle: false,
              });

              Router.push("/profile/login");
              return true;
            },
          },
        ]}
      >
        <></>
      </ModalBase>
    </>
  );
};

export default ModalLoginToContinue;
