import styles from "./AddressList.module.scss";

import { useEffect } from "react";

import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";

import AddressListItem from "../AddressListItem/AddressListItem";

import { useAtom } from "jotai";
import { inRange } from "lodash";
import useUser from "../../../../../hooks/useUser";
import { AddressSelection } from "../../../../../data/atoms/checkout/checkoutAtoms";
import { unlockStep } from "../../../../../data/atoms/cart/cartAtoms";
import ModalAddAddress from "../../../../Modal/AddAddressModal";

type Props = {
  className?: string;
  style?: {};
  children?: React.ReactNode;
};

const AddressList: React.FC<Props> = ({ children, className, style }) => {
  const { user } = useUser();

  const userData = user?.user;
  const [selectedAddress, setAddress] = useAtom(AddressSelection);
  const [unlockedSteps, unlock] = useAtom(unlockStep);

  const addAddressDisclosure = useDisclosure();

  useEffect(() => {
    if (userData) {
      // if there are no addresses, set the selected address to null and -1
      if (userData?.Address?.length === 0) {
        setAddress(-1);
        unlock(2);
      } else {
        // if there are addresses, but nothing is selected, set the first one as selected
        if (!inRange(selectedAddress, 0, userData?.Address?.length)) {
          setAddress(0);
          unlock(3);
        }
      }
    }
  }, [userData, selectedAddress, setAddress, unlock]);

  if (!userData) {
    return <></>;
  }

  return (
    <>
      {userData?.Address?.length === 0 ||
        (!userData.Address && (
          <Box className={styles.nothingYet}>
            <Text>You don&apos;t have any addresses yet! </Text>
            <Button
              onClick={() => {
                addAddressDisclosure.onOpen();
              }}
              mt={5}
              variant="main"
            >
              Add One
            </Button>
          </Box>
        ))}
      {userData?.Address?.length > 0 && (
        <>
          <Box display="grid" gap={5} pb={5} gridTemplateColumns="1fr 1fr 1fr">
            {userData.Address.map((address, index) => {
              return (
                <AddressListItem key={index} address={address} ind={index} />
              );
            })}
          </Box>
          <Box textAlign={"center"} pt={5}>
            <Button
              variant="main"
              onClick={() => {
                addAddressDisclosure.onOpen();
              }}
            >
              Add New Address
            </Button>
          </Box>
        </>
      )}

      <ModalAddAddress
        action={() => {
          addAddressDisclosure.onClose();
        }}
        disclosure={addAddressDisclosure}
      ></ModalAddAddress>
    </>
  );
};

export default AddressList;
