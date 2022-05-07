import { boolean } from "yup";
import { SingleCartProduct, SingleProduct } from "../../products/types";

export type Totals = {
  total_items: number;
  delivery: number;
  vat: number;
  total: number;
  discount: number;
};

export const emptyTotals = {
  total_items: 0,
  total: 0,
  delivery: 0,
  vat: 0,
  discount: 0,
};
export type StoreAddress = {
  Street_Address_1: string;
  Street_Address_2: string;
  Suburb: string;
  City: string;
  Country: string;
  Zip_Code: string;
};

export type CartItem = {
  Product: {
    data: SingleCartProduct;
  };
  Variation: number;
  Quantity: number;
  Extra: string | null;
};

export type CartItems = CartItem[];
