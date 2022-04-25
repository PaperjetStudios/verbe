import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import { useAtom } from "jotai";
import Router from "next/router";
import modal_keys from "./keys";
import ModalBase from "./ModalBase";

const key = modal_keys.are_you_sure;

type ModalProps = {
  action: () => void;
  disclosure: UseDisclosureProps;
};

const ModalAreYouSure: React.FC<ModalProps> = ({ action, disclosure }) => {
  return (
    <>
      <ModalBase
        trigger="are_you_sure"
        disclosure={disclosure}
        actions={[
          {
            label: "Yes",
            onClick: () => {
              disclosure.onClose();

              action();
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

export default ModalAreYouSure;
