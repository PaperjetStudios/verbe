import { currentApi } from "./api";

const randFormatter = new Intl.NumberFormat("en-za", {
  style: "currency",
  currency: "ZAR",
});

export const moneyFormatter = (cost: number | string) => {
  let value: number;
  if (typeof cost === "string") {
    value = parseFloat(cost);
  } else {
    value = cost;
  }

  return randFormatter.format(value);
};

export const makeDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
};

export const makeTime = (dateString: string): string => {
  const date = new Date(dateString);
  return (
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0")
  );
};

export const OrderStatuses = [
  "Open",
  "Shipped",
  "Received",
  "Closed",
  "Cancelled",
];

export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const readableWalletLogStatus = (status: string): string => {
  switch (status) {
    case "Payment_From_Buyer_Open":
      return "Payment from buyer (open)";
      break;
    case "Payment_From_Buyer_Closed":
      return "Payment from buyer (closed)";
      break;
    case "Payment_With_Wallet":
      return "Payment with wallet";
      break;
    case "Payout":
      return "Payout";
      break;
  }
  return "";
};

export const createProductLink = (slug: string) => {
  return `/product/${slug}`;
};

export const createProductEditLink = (id: string | number) => {
  return `/profile/edit-product/${id}`;
};

export const createCategoryLink = (id: string | number) => {
  return `/category/${id}`;
};

export const createTagLink = (id: string | number) => {
  return `/tag/${id}`;
};
export const createStoreLink = (slug: string) => {
  return `/store/${slug}`;
};

export const createOrderLink = (id: string) => {
  return `/profile/orders/${id}`;
};

const hasValidUrlProtocol = (url = "") =>
  ["http://", "https://", "ftp://"].some((protocol) =>
    url.startsWith(protocol)
  );

export const createImageLink = (src: any) => {
  if (typeof src === "string") {
    let path = src;
    if (!hasValidUrlProtocol(src)) {
      path = currentApi.url + src;
    }

    return path;
  } else {
    return "";
  }
};

type ProductImageSize = "large" | "medium" | "small" | "thumbnail";

export const createProductImageLink = (attributes, size: ProductImageSize) => {
  let url = attributes?.url;

  if (attributes?.formats) {
    if (attributes.formats[size]) {
      url = attributes.formats[size].url;
    }
  }

  return createImageLink(url ? url : "");
};

export const parseAsInt = (number: any) => {
  if (!number) {
    return 0;
  }
  if (typeof number === "string") {
    return parseInt(number);
  } else {
    return number;
  }
};
export const parseAsFloat = (number: any) => {
  if (typeof number === "string") {
    return parseFloat(number);
  } else {
    return number;
  }
};

export function inRange(x: number, min: number, max: number) {
  return (x - min) * (x - max) <= 0;
}

export function convertToAmount(amount: number | string) {
  if (amount) {
    if (typeof amount === "string") {
      return parseFloat(amount).toFixed(2);
    } else {
      return amount.toFixed(2);
    }
  }
}
