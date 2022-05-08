import { gql } from "@apollo/client";

export const ORDER_BASE = gql`
  fragment ORDER_BASE on Order {
    Unique
    createdAt
    Items
    Total
    Total_Delivery
    Total_Discount
    Total_Items

    Delivery_Address
    User_Info

    Status
  }
`;

export const GET_MY_ORDERS = (filterString: string) => gql`
  ${ORDER_BASE}
  query ($userId: ID!, $page: Int!, $pageSize: Int!) {
    orders(filters: {${filterString}}, pagination: { page: $page, pageSize: $pageSize }) {
      data {
        id
        attributes {
          ...ORDER_BASE
        }
      }
      meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  ${ORDER_BASE}
  query ($id: ID!) {
    order(id: $id) {
      data {
        id
        attributes {
          ...ORDER_BASE
        }
      }
    }
  }
`;
