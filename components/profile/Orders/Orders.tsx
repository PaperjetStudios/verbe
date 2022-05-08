import { Box } from "@chakra-ui/react";
import OrderList from "../../Common/Orders/OrderList/OrderList";

import styles from "./Orders.module.scss";

export type OrdersProps = {};

const Orders: React.FC<OrdersProps> = ({}) => {
  return (
    <Box className={styles.container}>
      <OrderList />
    </Box>
  );
};

export default Orders;
