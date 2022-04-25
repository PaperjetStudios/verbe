import { UseDisclosureProps } from "@chakra-ui/react";
import ModalBase from "./ModalBase";

type ModalProps = {
  action: (id: string | number) => void;
  subject?: string;
  storeId?: string | number;
  disclosure: UseDisclosureProps;
};

const ContactSellerModal: React.FC<ModalProps> = ({
  action,
  disclosure,
  subject,
  storeId,
}) => {
  return (
    <>
      <ModalBase
        hideFooter={true}
        trigger="contact_seller"
        disclosure={disclosure}
        message={" "}
      >
        <>
          {/*
          <ContactSeller
            storeId={storeId}
            subject={subject}
            callback={action}
  />*/}
        </>
      </ModalBase>
    </>
  );
};

export default ContactSellerModal;
