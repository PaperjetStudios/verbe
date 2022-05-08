import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import React from "react";
import { OrderStatusFilter } from "../../../data/atoms/filter/filterAtoms";
import { StatusProps } from "../../../data/orders/types";

export type FilterProps = {};

const OrderFilter: React.FC<FilterProps> = ({}) => {
  const [status, setStatus] = useAtom(OrderStatusFilter);

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} variant="main">
        Filter
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup
          defaultValue="none"
          title="Status"
          type="radio"
          onChange={(val) => {
            const filter = val as StatusProps;
            setStatus(filter);
          }}
        >
          <MenuItemOption value="All">All</MenuItemOption>
          <MenuItemOption value="Processing">Processing</MenuItemOption>
          <MenuItemOption value="Shipped">Shipped</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default OrderFilter;
