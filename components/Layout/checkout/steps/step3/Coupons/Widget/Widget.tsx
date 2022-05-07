import {
  Box,
  Button,
  CloseButton,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { SetCoupon } from "../../../../../../../data/atoms/coupon/couponAtoms";
import FormCoupon from "../../../../../../form/coupon";

import styles from "./Widget.module.scss";

export type WidgetProps = {};

const Widget: React.FC<WidgetProps> = ({}) => {
  const [coupon, setCoupon] = useAtom(SetCoupon);

  return (
    <Box
      mt={[4]}
      className={styles.container}
      rounded={"lg"}
      px={5}
      py={5}
      border="1px solid #efefef"
    >
      {coupon === null && (
        <>
          <FormCoupon />
        </>
      )}
      {coupon && (
        <HStack justifyContent={"space-between"}>
          <Box>
            <Text color="#999" fontSize="xs">
              Coupon Applied:
            </Text>
            <Text fontWeight={"bold"}> {coupon?.Code}</Text>
          </Box>
          <CloseButton onClick={() => setCoupon(null)} />
        </HStack>
      )}
    </Box>
  );
};

export default Widget;
