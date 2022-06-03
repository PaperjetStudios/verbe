import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import { useEffect } from "react";

import FormNewsletterPopup from "../form/newsletter-popup";

import ModalBaseSimple from "./ModalBaseSimple";

type ModalProps = {};

const ModalNewsletter: React.FC<ModalProps> = () => {
  const ModalNewsletterDisclosure = useDisclosure();
  useEffect(() => {
    const newsletterTimeOut = setTimeout(() => {
      ModalNewsletterDisclosure.onOpen();
    }, 1000);

    () => {
      clearTimeout(newsletterTimeOut);
    };
  }, []);
  return (
    <>
      <ModalBaseSimple
        hideFooter={true}
        trigger="newsletter"
        disclosure={ModalNewsletterDisclosure}
        message={" "}
      >
        <FormNewsletterPopup
          closeModal={() => {
            ModalNewsletterDisclosure.onClose();
          }}
        />
      </ModalBaseSimple>
    </>
  );
};

export default ModalNewsletter;
