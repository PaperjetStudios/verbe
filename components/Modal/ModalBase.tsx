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
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { createImageLink } from "../../config/util";
import { getNotificationData } from "../../data/modals";

import styles from "./ModalBase.module.scss";

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

const ModalBase: React.FC<Props> = ({
  disclosure,
  actions,
  children,
  trigger,
  message = "",
  subtitle = "",
  heading = "",
  hideFooter = false,
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
        <ModalOverlay />
        <ModalContent maxW={["90%", "70%"]} className={styles.main}>
          <ModalHeader
            fontSize={25}
            fontWeight="700"
            className={styles.header}
            style={{
              backgroundImage: `url(${createImageLink(
                modalData?.Image?.data?.attributes.url
              )})`,
            }}
          >
            {heading !== "" && heading}
            {heading === "" && modalData.Headline}
          </ModalHeader>
          <ModalCloseButton className={styles.closebutton} />
          <ModalBody
            padding={["20px", "20px", null, "30px 30px"]}
            className={styles.body}
          >
            <>
              {message === "" && (
                <Text
                  dangerouslySetInnerHTML={{ __html: modalData.Message }}
                ></Text>
              )}
              {message !== "" && (
                <>{message !== " " && <Text>{message}</Text>}</>
              )}
              <>{children}</>
            </>
          </ModalBody>
          {!hideFooter && (
            <ModalFooter className={styles.footer}>
              <Button variant="main" mr={3} onClick={onClose}>
                Close
              </Button>
              {actions?.map((action, ind) => {
                return (
                  <Button
                    key={action.label + ind}
                    variant="main"
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                );
              })}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalBase;
