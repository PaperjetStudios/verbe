import { Box } from "@chakra-ui/react";

import styles from "./Orders.module.scss";

export type OrdersProps = {};

const Orders: React.FC<OrdersProps> = ({}) => {
  return <Box className={styles.container}></Box>;
};

export default Orders;
