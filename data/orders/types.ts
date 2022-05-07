import { Coupon } from "../atoms/coupon/types";

export type OrderData = {
  id?: string | number;
  Unique?: string;
  Items: any[];
  Total: string | number;
  Total_Delivery: string | number;
  Total_Items: string | number;
  Total_Discount?: string | number;
  Status?: string;
  Delivery_Address: any;
  User_Info: any;
  Coupon?: Coupon;
};
