import { Box, Button, Divider, Text } from "@chakra-ui/react";

import {
  createImageLink,
  makeDate,
  moneyFormatter,
} from "../../../../config/util";
import { OrderDataIn } from "../../../../data/orders/types";
import Loader from "../../Loader/Loader";
import InfoBox from "./InfoBox/InfoBox";

import styles from "./OrderSingle.module.scss";

export type OrderSingleProps = {
  orderProps: OrderDataIn;
};

const ObjectList = (
  data: any,
  classN: any = styles.InfoBoxText,
  filter: any = null
) => {
  if (data) {
    return Object.keys(data).map((key) => {
      if (data[key] != "") {
        return (
          <Box key={key} className={classN}>
            <Text className={styles.infoTitle}>{key}</Text>
            <Text className={styles.infoMation}>
              {filter ? filter(data[key]) : data[key]}
            </Text>
          </Box>
        );
      }
    });
  } else {
    return <></>;
  }
};

const OrderSingle: React.FC<OrderSingleProps> = ({ orderProps }) => {
  const order = orderProps;

  if (!order) {
    return <Loader />;
  }

  const {
    User_Info,
    Unique,
    Delivery_Address,
    createdAt,
    Total,
    Items,
    Total_Delivery,
    Total_Items,
  } = order.attributes;

  const transactionList = {
    Total: Total,
    Delivery: Total_Delivery,
    Items: Total_Items,
  };

  return (
    <Box className={styles.container}>
      <Box display="flex" justifyContent={"space-between"}>
        <Box>
          <Text pt={5} fontSize="sm">
            Order#
          </Text>
          <Text pb={5} fontWeight="bold" fontSize="lg">
            {Unique}
          </Text>
        </Box>
        <Box textAlign={"right"}>
          <Text pt={5} fontSize="sm">
            {makeDate(createdAt)}
          </Text>
          <Text pb={5} fontWeight="bold" fontSize="lg">
            {moneyFormatter(Total)}
          </Text>
        </Box>
      </Box>

      <Divider />

      <Text fontWeight="600" mt={5} fontSize="sm">
        Items:
      </Text>

      {Items.map((item: any, index) => (
        <Box key={index} className={styles.itemContainer}>
          <Box display="flex" alignItems={"center"}>
            <img
              width="80px"
              height="80px"
              src={createImageLink(
                item.Product.data.attributes.Featured_Image.data.attributes
                  .formats.thumbnail.url
              )}
            />
            <Box ml={5}>
              <Text fontWeight={"bold"}>
                {item.Product.data.attributes.Title}
              </Text>
              <Text fontSize={"sm"}>x{item.Quantity}</Text>
            </Box>
          </Box>
          <Text fontWeight={"bold"}>
            {moneyFormatter(item.Product.data.attributes.Price)}
          </Text>
        </Box>
      ))}

      <Box pt="5" display={"grid"} gridTemplateColumns={"1fr 1fr"} gap="20px">
        <InfoBox title="Transaction">
          {ObjectList(transactionList, styles.InfoBoxTextPrice, (e) =>
            moneyFormatter(e)
          )}
        </InfoBox>
        {/*}
        <InfoBox title="Customer">
          <>{ObjectList(User_Info)}</>
        </InfoBox>*/}
        {Delivery_Address && (
          <InfoBox title="Address">{ObjectList(Delivery_Address)}</InfoBox>
        )}
      </Box>
    </Box>
  );
};

export default OrderSingle;
