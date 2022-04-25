import { useQuery } from "react-query";
import {
  getMainMenu,
  MainMenuDataType,
  MainMenuItemType,
} from "../../../data/settings/main-menu";

import MenuItem from "./MenuItem";

const Menu = () => {
  const { data: menuData, isLoading: menuLoading } = useQuery<MainMenuDataType>(
    "main-menu",
    getMainMenu
  );

  if (menuLoading) {
    return <></>;
  }

  const menu = menuData?.data.menu.data.attributes;

  return (
    <nav>
      {menu?.Item.map((item: MainMenuItemType, index) => {
        return <MenuItem key={index} {...item} />;
      })}
    </nav>
  );
};

export default Menu;
