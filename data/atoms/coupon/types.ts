export type Coupon = {
  id: number | string;
  Code: string;
  MinimumSpend: number;
  ValidUntil: string;
  Discount: number;
  Type: "Fixed" | "Percentage";
};
