import {
  Button,
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
import {
  PriceFilter,
  SizeFilter,
} from "../../../data/atoms/filter/filterAtoms";

import styles from "./Filter.module.scss";

export type FilterProps = {};

const Filter: React.FC<FilterProps> = ({}) => {
  const [price, setPrice] = useAtom(PriceFilter);
  const [size, setSize] = useAtom(SizeFilter);

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} variant="main">
        Filter
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup
          defaultValue="any"
          title="Size"
          type="radio"
          onChange={(val) => {
            setSize(val !== "" ? val : "any");
          }}
        >
          <MenuItemOption value="any">Any</MenuItemOption>
          <MenuItemOption value="S">S</MenuItemOption>
          <MenuItemOption value="M">M</MenuItemOption>
          <MenuItemOption value="L">L</MenuItemOption>
          <MenuItemOption value="XL">XL</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup
          onChange={(val) => {
            setPrice(val !== "" ? val : "none");
          }}
          title="Price Order"
          type="radio"
          defaultValue="none"
        >
          <MenuItemOption value="asc">Lowest to Highest</MenuItemOption>
          <MenuItemOption value="desc">Highest to Lowest</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default Filter;
