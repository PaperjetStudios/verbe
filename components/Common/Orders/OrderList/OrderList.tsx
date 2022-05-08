import {
  Box,
  StatUpArrow,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import styles from "./OrderList.module.scss";

import { useAtom } from "jotai";
import { OrdersProps } from "../../../profile/Orders/Orders";
import {
  OrderSearchFilter,
  OrderStatusFilter,
} from "../../../../data/atoms/filter/filterAtoms";
import usePagination from "../../../Layout/Pagination/usePagination";
import Loader from "../../Loader/Loader";
import { OrderDataIn } from "../../../../data/orders/types";
import OrdersListItem from "../OrdersListItem/OrdersListItem";
import Pagination from "../../../Layout/Pagination/Pagination";

export type OrderListProps = OrdersProps;

export const TableRowList = [
  { title: "Order", key: "orderId", value: "Unique" },
  { title: "Date", key: "date", value: "createdAt" },
  { title: "Total", key: "total", value: "Total" },
  { title: "Items", key: "items", value: "w_items_count" },

  { title: "Status", key: "status", value: "Status" },
  { title: "Update", key: "update", value: "w_update" },
];

const OrderList: React.FC<OrderListProps> = () => {
  const [status, setStatus] = useAtom(OrderStatusFilter);
  const [search, setSearch] = useAtom(OrderSearchFilter);

  const { paginationSettings, setPagination, setPage, curPage } =
    usePagination();

  const {
    data: orders,
    refetch,
    isLoading,
  } = useQuery("orderlist", () =>
    axios
      .post("/api/orders", {
        page: curPage,
        pageSize: 2,
        filters: {
          status: status,
          search: search,
        },
      })
      .then((res) => {
        setPagination(res.data.pagination);
        return res.data.orders;
      })
  );

  useEffect(() => {
    refetch();
  }, [curPage, status, search]);

  if (isLoading) {
    return <Loader />;
  }

  if (!orders) {
    return <></>;
  }

  return (
    <Box className={styles.container}>
      {orders.length === 0 && (
        <Box p={5} border="1px solid #eee">
          <Text>No orders found.</Text>
        </Box>
      )}
      {orders.length > 0 && (
        <>
          <TableContainer mb={5}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {TableRowList.map(({ title, key }, index) => (
                    <Th key={index + "_" + key}>{title}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order: OrderDataIn) => (
                  <OrdersListItem key={order.id} order={order} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Pagination
            page={curPage}
            settings={paginationSettings}
            setPage={setPage}
          />
        </>
      )}
    </Box>
  );
};

export default OrderList;
