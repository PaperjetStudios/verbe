import { UseDisclosureProps } from "@chakra-ui/react";
import NewProduct from "../form/product/New/New";

import ModalBase from "./ModalBase";

type ModalProps = {
  action: () => void;
  subject?: string;
  disclosure: UseDisclosureProps;
};

const NewProductModal: React.FC<ModalProps> = ({
  action,
  disclosure,
  subject,
}) => {
  return (
    <>
      <ModalBase
        hideFooter={true}
        trigger="new_product"
        disclosure={disclosure}
        message={" "}
      >
        <>
          <NewProduct callback={action} />
        </>
      </ModalBase>
    </>
  );
};

export default NewProductModal;
