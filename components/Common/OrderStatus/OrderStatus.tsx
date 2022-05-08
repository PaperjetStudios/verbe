import { Box, Button, Badge } from "@chakra-ui/react";

import styles from "./OrderStatus.module.scss";

import { useEffect, useState } from "react";

import axios from "axios";
import { OrderDataIn } from "../../../data/orders/types";
import { orderStatus, OrderStatus } from "../../../data/orders/logic";
import useUser from "../../../hooks/useUser";

export type OrderStatusProps = {
  order: OrderDataIn;
};

const OrderStatus: React.FC<OrderStatusProps> = ({ order: initial_order }) => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(initial_order);
  const [curStatus, setStatus] = useState<OrderStatus>(null);

  const updateOrder = async (id: string | number, data: any) => {
    setLoading(true);

    await axios
      .post("/api/order", { type: "status", orderId: id, status: data.Status })
      .then((res) => {
        console.log(res);
        //@ts-ignore
        setOrder(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user && order.attributes) {
      setStatus(orderStatus(order, user, updateOrder));
    }
  }, [user, order]);

  if (curStatus) {
    if (curStatus.interactive) {
      return (
        <Button
          isLoading={loading}
          onClick={(e) => {
            e.stopPropagation();
            curStatus.action();
          }}
          className={styles.orderStatus}
        >
          {curStatus.label}
        </Button>
      );
    } else {
      return (
        <Badge
          fontSize="sm"
          px={4}
          py={1}
          className={styles.orderStatus}
          colorScheme="green"
        >
          {curStatus.label}
        </Badge>
      );
    }
  } else {
    return <></>;
  }
};

export default OrderStatus;
