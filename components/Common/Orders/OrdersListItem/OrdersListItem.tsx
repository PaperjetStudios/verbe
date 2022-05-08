import { Box, Button, Td, Tr, Badge } from "@chakra-ui/react";
import Router from "next/router";

import { moneyFormatter } from "../../../../config/util";
import { OrderDataIn } from "../../../../data/orders/types";
import { rootOrder } from "../../../profile/Holder/Holder";
import OrderStatus from "../../OrderStatus/OrderStatus";
import { TableRowList } from "../OrderList/OrderList";

import styles from "./OrdersListItem.module.scss";

export type OrdersListItemProps = {
  order: OrderDataIn;
};

const OrdersListItem: React.FC<OrdersListItemProps> = ({ order }) => {
  return (
    <Tr
      className={styles.tableRow}
      onClick={() => {
        Router.push(rootOrder + "/" + order.id);
      }}
    >
      {TableRowList.map((item, index) => {
        const { title, key, value } = item;
        let data = order.attributes[value];
        switch (value) {
          case "createdAt":
            data = new Date(data).toLocaleDateString();
            break;
          case "Total":
            data = moneyFormatter(data);
            break;
          case "w_update":
            data = <OrderStatus order={order} />;
            break;
          case "w_delivery_method":
            data = order.attributes.Delivery_Address.method.Title;
            break;
          case "w_items_count":
            data = order.attributes.Items.length + " item(s)";
            break;
          default:
            break;
        }
        return (
          <Td fontSize="13px" key={index + "_" + item.key}>
            {data}
          </Td>
        );
      })}
    </Tr>
  );
};

export default OrdersListItem;
