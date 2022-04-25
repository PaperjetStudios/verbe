import {
  Box,
  CloseButton,
  Divider,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";

import { Address } from "../types";
import styles from "./AddressListItem.module.scss";

import { omit, filter } from "lodash";

import { Icons } from "../../../../Common/icons";
import { editAddresses } from "../state";
import React from "react";
import { AddressSelection } from "../../../../../data/atoms/checkout/checkoutAtoms";
import useUser from "../../../../../hooks/useUser";
import ModalUpdateAddress from "../../../../Modal/UpdateAddressModal";
import ModalAreYouSure from "../../../../Modal/AreYouSure";
import cs from "../../../../../config/cs";

export type AddressListItemProps = {
  address: Address;
  ind: number;
};

type ListItemProps = { children: React.ReactNode };

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return <Text fontSize="sm">{children}</Text>;
};

const AddressListItem: React.FC<AddressListItemProps> = ({ ind, address }) => {
  const [selectedAddress, setAddress] = useAtom(AddressSelection);

  const { user, userMutation } = useUser();
  const userData = user.user;

  const areYouSureDisclosure = useDisclosure();
  const editAddressDisclosure = useDisclosure();
  return (
    <>
      <Box
        onClick={() => {
          setAddress(ind);
        }}
        className={cs(styles.container, {
          [styles.activeContainer]: selectedAddress === ind,
        })}
      >
        <Box position="relative">
          <Text mb={2} fontWeight={"bold"}>{`Address ${ind + 1}`}</Text>
          <CloseButton
            position="absolute"
            top={-1}
            right={-4}
            rounded={"100%"}
            onClick={() => {
              areYouSureDisclosure.onOpen();
            }}
          />
        </Box>
        <Divider />
        <Box display={"flex"} flexDirection={"column"} gap={1} mt={2}>
          {Object.values(omit(address, "__typename")).map((value, index) => {
            return (
              <ListItem key={`${ind}+${value}+${index}`}>{value}</ListItem>
            );
          })}
          <Box
            className={styles.editButton}
            onClick={() => {
              editAddressDisclosure.onOpen();
            }}
          >
            {Icons.pen}
            <Text fontSize={"sm"}>Edit</Text>
          </Box>
        </Box>
      </Box>
      <ModalUpdateAddress
        id={ind}
        disclosure={editAddressDisclosure}
        action={() => {
          editAddressDisclosure.onClose();
        }}
      ></ModalUpdateAddress>
      <ModalAreYouSure
        disclosure={areYouSureDisclosure}
        action={() => {
          const newAddresses = editAddresses(userData, [], ind, true).Address;
          userMutation.mutate({
            Address: newAddresses,
          });
          if (newAddresses.length > 0) {
            setAddress(0);
          } else {
            setAddress(-1);
          }
        }}
      ></ModalAreYouSure>
    </>
  );
};

export default AddressListItem;
