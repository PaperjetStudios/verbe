import { Box } from "@chakra-ui/react";

import styles from "./Order.module.scss";

export type OrderProps = {};

const Order: React.FC<OrderProps> = ({}) => {
  return <Box className={styles.container}></Box>;
};

export default Order;
