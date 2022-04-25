import { UseDisclosureProps } from "@chakra-ui/react";
import AddressFormSingle from "../form/user/address/AddressFormSingle";
import ModalBase from "./ModalBase";

type ModalProps = {
  action: () => void;
  id: number | string;
  disclosure: UseDisclosureProps;
};

const ModalUpdateAddress: React.FC<ModalProps> = ({
  action,
  disclosure,
  id,
}) => {
  return (
    <>
      <ModalBase
        hideFooter={true}
        trigger="update_address"
        disclosure={disclosure}
        message={" "}
      >
        <>
          <AddressFormSingle callback={action} id={id} />
        </>
      </ModalBase>
    </>
  );
};

export default ModalUpdateAddress;
