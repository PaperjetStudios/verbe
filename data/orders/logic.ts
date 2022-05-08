import { User } from "../../config/UserTypes";
import { parseAsInt } from "../../config/util";
import { OrderDataIn } from "./types";

export type OrderStatusColours =
  | "normal"
  | "success"
  | "needs-action"
  | "cancelled"
  | "in-process";

export type OrderStatus = {
  interactive: boolean;
  label?: string;
  color?: OrderStatusColours;
  action?: () => void;
};

export const orderStatus = (
  order: OrderDataIn,
  user: User,
  updateOrder: (orderId, orderData) => void = null
): OrderStatus => {
  if (order) {
    const userId = user?.user ? parseAsInt(user.user.id) : -1;
    const status = order.attributes.Status;

    let Object: OrderStatus = {
      interactive: false,
      label: "not set",
    };

    switch (status) {
      case "Processing":
        Object.label = "Processing";
        Object.color = "in-process";
        break;
      case "Shipped":
        Object.label = "Shipped";
        Object.color = "success";
        break;
    }

    return Object;
  } else {
    return null;
  }
};
