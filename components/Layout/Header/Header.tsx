import { Box, Text, IconButton, AlertIcon, Input } from "@chakra-ui/react";
import Link from "next/link";

import { useQuery } from "react-query";

import styles from "./Header.module.scss";

import { useAtom } from "jotai";
import useUser from "../../../hooks/useUser";
import { CartCount, toggleDrawer } from "../../../data/atoms/cart/cartAtoms";
import { ToggleModal } from "../../../data/atoms/modal/modalAtoms";
import { ToggleSearchModal } from "../../../data/atoms/search/searchAtoms";
import { getMainMenu } from "../../../data/settings/main-menu";
import { getOptionData, OptionDataType } from "../../../data/settings/options";
import Loader from "../../Common/Loader/Loader";
import { Icons } from "../../Common/icons";
import Menu from "../Menu/Menu";
import modal_keys from "../../Modal/keys";
import Badge from "../../Common/Badge/Badge";
import ScrollText from "./ScrollText/ScrollText";

import Responsive from "../../Common/Responsive";
import { toggleMobileMenu } from "../../../data/atoms/mobile-menu/mobile-menu";
import Search from "../../Common/Search/Search";

const Header = () => {
  const { user, isLoggedIn } = useUser();

  const [__, setIsCartOpen] = useAtom(toggleDrawer);
  const [itemCount] = useAtom(CartCount);
  const [_, toggleModal] = useAtom(ToggleModal);
  const [modalSearch, toggleSearch] = useAtom(ToggleSearchModal);
  const [mobileMenuShowing, toggleMenuShowing] = useAtom(toggleMobileMenu);

  const { data: optionsData, isLoading: optionsLoading } =
    useQuery<OptionDataType>("options", getOptionData);

  if (optionsLoading) {
    return <Loader contained={false} />;
  }

  const options = optionsData?.data.option.data.attributes;

  return (
    <>
      <header>
        <Box className={styles.topBox}>
          <Box>
            <Text fontWeight={"600"}>{options ? options.Notice : ""}</Text>
          </Box>
          <Responsive.Desktop>
            <Box className={styles.topButtons}>
              {!isLoggedIn && (
                <>
                  <Link href="/profile/login">
                    <a>
                      <button>Login {Icons.menu.user}</button>
                    </a>
                  </Link>
                  <Link href="/profile/register">
                    <a>
                      <button>Register {Icons.menu.user}</button>
                    </a>
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Link href="/profile">
                    <a>
                      <button>Profile {Icons.menu.user}</button>
                    </a>
                  </Link>
                </>
              )}
            </Box>
          </Responsive.Desktop>
        </Box>
        <Box className={styles.mainHeader}>
          <Box className={styles.logoAndMenuContainer}>
            <Link href="/">
              <a>
                <img
                  alt="logo"
                  className={styles.logo}
                  src={options ? options.Logo.data.attributes.url : ""}
                />
              </a>
            </Link>
            <Responsive.Desktop>
              <Menu />
            </Responsive.Desktop>
          </Box>
          <Box className={styles.sideMenu}>
            <Responsive.Desktop>
              <IconButton
                onClick={() => toggleSearch(true)}
                aria-label="search"
                size="lg"
                variant="transparent"
                icon={<>{Icons.search}</>}
              />
              {!isLoggedIn && (
                <IconButton
                  onClick={() =>
                    toggleModal({
                      name: modal_keys.login_to_continue,
                      toggle: true,
                    })
                  }
                  aria-label="wishlist"
                  size="lg"
                  variant="transparent"
                  icon={<>{Icons.heart}</>}
                />
              )}
              {isLoggedIn && (
                <Link href="/wishlist">
                  <a>
                    <IconButton
                      aria-label="wishlist"
                      size="lg"
                      variant="transparent"
                      icon={<>{Icons.heart}</>}
                    />
                  </a>
                </Link>
              )}
            </Responsive.Desktop>

            <Badge number={itemCount}>
              <IconButton
                aria-label="cart"
                size="lg"
                variant="transparent"
                onClick={() => {
                  setIsCartOpen(true);
                }}
                icon={<>{Icons.shoppingcart}</>}
              />
            </Badge>
            <Responsive.Mobile>
              <IconButton
                aria-label="mobile"
                size="lg"
                variant="transparent"
                onClick={() => {
                  toggleMenuShowing(true);
                }}
                icon={<>{Icons.menu.bars}</>}
              />
            </Responsive.Mobile>
          </Box>
        </Box>
      </header>
      <Responsive.Mobile>
        <Search />
      </Responsive.Mobile>
      <ScrollText />
    </>
  );
};

export default Header;
