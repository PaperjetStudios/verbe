import { Box, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { Wizard } from "react-use-wizard";

import Step1Cart from "./steps/step-1-cart";
import Step2Info from "./steps/step-2-info";
import Step3Checkout from "./steps/step-3-payment";

import styles from "./checkout.module.scss";
import { axiosInstance } from "../../../config/api";
import { SetCheckoutSettings } from "../../../data/atoms/checkout/checkoutAtoms";
import { useAtom } from "jotai";

type Props = {};

const CheckoutBase: React.FC<Props> = () => {
  const [_, setSettings] = useAtom(SetCheckoutSettings);

  useEffect(() => {
    axiosInstance()
      .get("/orderutils/settings")
      .then((res) => {
        setSettings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box className={styles.greyBacking}>
      <Box className={styles.container}>
        <Wizard>
          <Step1Cart />
          <Step2Info />
          <Step3Checkout />
        </Wizard>
      </Box>
    </Box>
  );
};

export default CheckoutBase;
