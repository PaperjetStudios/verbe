import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { createImageLink } from "../../config/util";
import { getNotificationData } from "../../data/modals";

import styles from "./ModalBaseSimple.module.scss";

type ModalAction = {
  onClick: () => any;
  label: string;
};

type Props = {
  disclosure: UseDisclosureProps;
  actions?: ModalAction[];
  trigger: string;
  heading?: string;
  subtitle?: string;
  message?: string;
  children?: React.ReactNode;
  hideFooter?: boolean;
  size?: "lg" | "sm" | "md";
  centered?: boolean;
};

const ModalBaseSimple: React.FC<Props> = ({
  disclosure,

  children,
  trigger,

  size = "lg",
  centered = true,
}) => {
  const { isOpen, onOpen, onClose } = disclosure;

  const { data, isLoading } = useQuery(`modal-data-${trigger}`, () =>
    getNotificationData(trigger)
  );
  const modalData = data?.data.notifications.data[0].attributes;

  if (isLoading || !modalData) {
    return <></>;
  }

  return (
    <>
      <Modal
        size={size}
        isCentered={centered}
        isOpen={isOpen ? isOpen : false}
        onClose={onClose ? onClose : () => {}}
      >
        <ModalOverlay background="rgba(255,255,255,0.5)" />
        <ModalContent
          rounded={"none"}
          maxW={["40%", "40%"]}
          className={styles.main}
          background="#000"
        >
          <ModalCloseButton className={styles.closebutton} />
          <ModalBody
            padding={["20px", "20px", null, "30px 30px"]}
            className={styles.body}
          >
            <VStack alignItems="center" justifyContent={"center"}>
              <Text
                fontSize="100px"
                lineHeight="0.8"
                textTransform={"uppercase"}
                fontWeight="bold"
                color="#fff"
              >
                {modalData.Headline}
              </Text>
              <Text color="#fff" fontWeight="bold" letterSpacing={"2px"}>
                {modalData.Message}
              </Text>
              <>{children}</>
              <img
                width={"40%"}
                height="auto"
                src={createImageLink(modalData?.Image?.data?.attributes.url)}
                alt="verbe logo"
              />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalBaseSimple;
