import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Router from "next/router";
import { Icons } from "../../../Common/icons";
import { HolderProps } from "../Holder";

import styles from "./MobileMenu.module.scss";

export type MobileMenuProps = HolderProps & {};

const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems, title }) => {
  return (
    <Menu autoSelect={false}>
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: "gray.400" }}
        _expanded={{ bg: "blue.400" }}
        _focus={{ boxShadow: "outline" }}
      >
        {Icons.menu.bars}
      </MenuButton>
      <MenuList>
        {menuItems.map((item, index) => (
          <MenuItem
            onClick={() => {
              Router.push(item.link);
            }}
            key={"holder_" + item.label}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MobileMenu;
