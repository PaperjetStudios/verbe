import { UseDisclosureProps } from "@chakra-ui/react";
import AddressFormSingle from "../form/user/address/AddressFormSingle";
import ModalBase from "./ModalBase";

type ModalProps = {
  action: () => void;
  disclosure: UseDisclosureProps;
};

const ModalAddAddress: React.FC<ModalProps> = ({ action, disclosure }) => {
  return (
    <>
      <ModalBase
        hideFooter={true}
        trigger="add_address"
        disclosure={disclosure}
        message={" "}
      >
        <>
          <AddressFormSingle callback={action} />
        </>
      </ModalBase>
    </>
  );
};

export default ModalAddAddress;
