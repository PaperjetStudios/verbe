import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";

import { useQuery } from "react-query";
import {
  getMainMenu,
  MainMenuDataType,
  MainMenuItemType,
} from "../../../data/settings/main-menu";
import { Icons } from "../../Common/icons";

import styles from "./Menu.module.scss";
import MenuDropdownItem from "./MenuDropdownItem";
import MenuItem from "./MenuItem";

type MenuDropdownProps = {
  items?: MainMenuItemType[];
};

const MenuDropdown = ({ items }) => {
  return (
    <nav className={styles.menuDropdown}>
      <Menu>
        <MenuButton
          background={"none"}
          as={Button}
          textTransform="uppercase"
          fontWeight={700}
          fontSize="sm"
          rightIcon={Icons.chevron.down}
          _hover={{
            background: "#fff",
          }}
          _active={{
            background: "#fff",
          }}
          _focus={{
            background: "#fff",
          }}
        >
          Collections
        </MenuButton>
        <MenuList>
          {items.map((item: MainMenuItemType, index) => {
            return <MenuDropdownItem key={index} {...item} />;
          })}
        </MenuList>
      </Menu>
    </nav>
  );
};

export default MenuDropdown;
