import { Box, Button } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../../../../../config/api";
import { OrderData } from "../../../../../../data/orders/types";
import useCheckout from "../useCheckout";
import { createPFData } from "./PayfastUtils";

import { Items, Total } from "../../../../../../data/atoms/cart/cartAtoms";

export type PayfastWidgetProps = {};

export type PayfastSettings = {
  merchant_id?: string;
  merchant_key?: string;
  passPhrase?: string;
  success_url?: string;
  fail_url?: string;
  debug?: boolean;
};

const PayfastWidget: React.FC<PayfastWidgetProps> = () => {
  const { createOrder, loading: orderLoading, orderData } = useCheckout();

  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<PayfastSettings | null>(null);
  const [pfData, setPFData] = useState<any>(null);
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (!settings) {
      axiosInstance()
        .get("/payfast")
        .then((data) => {
          setSettings(data.data.settings);
        });
    }
  }, [settings]);

  const createOrderFormDetails = () => {
    if (settings && orderData) {
      const pfDataReturn = createPFData(settings, orderData);
      setPFData(pfDataReturn);
      axiosInstance()
        .post("/payfast/md5", pfDataReturn)
        .then((data) => {
          setHash(data.data);
        });
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoading(true);
      createOrderFormDetails();
    }
  }, [orderData]);

  useEffect(() => {
    if (hash !== "") {
      //@ts-ignore
      document.getElementById("payfastform").submit();
    }
  }, [hash]);

  let formElement;

  if (settings && pfData && hash !== "") {
    const debug = settings.debug;

    const url = !debug
      ? "https://www.payfast.co.za/eng/process"
      : "https://sandbox.payfast.co.za/eng/process";

    formElement = (
      <form id="payfastform" action={url} method="post">
        {Object.entries(pfData).map(([key, value]) => {
          return (
            <input
              key={key}
              type="hidden"
              name={key}
              //@ts-ignore
              value={`${value.trim()}`}
            />
          );
        })}

        <input type="hidden" name="signature" value={hash} />
      </form>
    );
  }

  return (
    <Box>
      <Button
        onClick={() => {
          createOrder();
        }}
        isLoading={loading || orderLoading}
      >
        Pay with Payfast
      </Button>
      {formElement}
    </Box>
  );
};

export default PayfastWidget;
