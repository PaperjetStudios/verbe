import { Coupon } from "../atoms/coupon/types";

export type OrderData = {
  id?: string | number;
  Unique?: string;
  Items: any[];
  Total: string | number;
  Total_Delivery: string | number;
  Total_Items: string | number;
  Total_Discount?: string | number;
  Status?: StatusProps;
  Delivery_Address: any;
  User_Info: any;
  Coupon?: Coupon;
  createdAt?: string;
};

export type OrderDataIn = {
  id: string;
  attributes: OrderData;
};

export type OrderFilters = {
  status?: StatusProps;
  search?: string;
};

export type StatusProps = "Open" | "Processing" | "Shipped";
