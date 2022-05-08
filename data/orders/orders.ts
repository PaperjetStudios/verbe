import client from "../../config/api";
import { GET_MY_ORDERS, GET_ORDER_BY_ID } from "./queries";
import { OrderFilters, StatusProps } from "./types";

export const getOrderById = async (id: string, context) => {
  const response = await client(context.jwt).query({
    query: GET_ORDER_BY_ID,
    variables: {
      id: id,
    },
  });
  console.log("GETORDER", response.data);
  return response;
};

export const makeFilterString = (filters: OrderFilters) => {
  let filterString = "";

  filterString += `Buyer: { id: { eq: $userId } }`;

  if (filters) {
    if (filters.status && filters.status !== ("All" as StatusProps)) {
      filterString += `, Status: {eq: "${filters.status}"}`;
    }

    if (filters.search) {
      filterString += `, Unique: {contains: "${filters.search}"}`;
    }
  }

  return {
    filterString,
  };
};

export const getFilteredOrders = async (
  userId: string | number,
  page: number = 1,
  pageSize: number = 1,
  context: any,
  filters?: OrderFilters
) => {
  const generatedFilters = makeFilterString(filters);

  const query = GET_MY_ORDERS(generatedFilters.filterString);

  const response = await client(context.jwt)
    .query({
      query: query,
      variables: {
        userId: userId,
        page: page,
        pageSize: pageSize,
      },
    })
    .catch((e) => {
      console.log(e);
      console.log(e?.networkError?.result?.errors);
    });

  return response;
};
