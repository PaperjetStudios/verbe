import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { useQuery } from "react-query";
import { toggleMobileMenu } from "../../../data/atoms/mobile-menu/mobile-menu";
import { ToggleModal } from "../../../data/atoms/modal/modalAtoms";
import { getOptionData, OptionDataType } from "../../../data/settings/options";
import useUser from "../../../hooks/useUser";
import { Icons } from "../../Common/icons";
import Loader from "../../Common/Loader/Loader";
import modal_keys from "../../Modal/keys";
import SocialListing from "../../Widgets/SocialListing/SocialListing";
import Menu from "../Menu/Menu";

import styles from "./MobileMenu.module.scss";

export type MobileMenuProps = {};

const MobileMenu: React.FC<MobileMenuProps> = ({}) => {
  const [isOpen, setIsOpen] = useAtom(toggleMobileMenu);
  const { user, isLoggedIn } = useUser();
  const [_, toggleModal] = useAtom(ToggleModal);

  const onClose = () => {
    setIsOpen(false);
  };

  const { data: optionsData, isLoading: optionsLoading } =
    useQuery<OptionDataType>("options", getOptionData);

  if (optionsLoading) {
    return <Loader />;
  }

  const options = optionsData?.data.option.data.attributes;

  return (
    <Box className={styles.container}>
      <Drawer isOpen={isOpen} placement="right" size={"md"} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          {/*<DrawerCloseButton />*/}
          <DrawerHeader px={14} py={5}>
            <Link href="/">
              <a>
                <img
                  alt="logo"
                  className={styles.logo}
                  src={options ? options.Logo.data.attributes.url : ""}
                />
              </a>
            </Link>
          </DrawerHeader>

          <DrawerBody
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
          >
            <Menu />
          </DrawerBody>
          <DrawerFooter>
            <Box w="100%">
              {!isLoggedIn && (
                <Box display="flex" gap={2}>
                  <Link href="/profile/login">
                    <a style={{ flex: 1 }}>
                      <Button
                        variant="outline"
                        w="100%"
                        leftIcon={Icons.menu.user}
                      >
                        Login{" "}
                      </Button>
                    </a>
                  </Link>
                  <Link href="/profile/register">
                    <a style={{ flex: 1 }}>
                      <Button
                        variant="outline"
                        w="100%"
                        leftIcon={Icons.menu.user}
                      >
                        Register{" "}
                      </Button>
                    </a>
                  </Link>
                </Box>
              )}
              {isLoggedIn && (
                <Link href="/profile">
                  <a style={{ flex: 1 }}>
                    <Button
                      variant="outline"
                      w="100%"
                      leftIcon={Icons.menu.user}
                    >
                      Profile
                    </Button>
                  </a>
                </Link>
              )}

              <Box
                mt={2}
                w="100%"
                flexDir="row"
                display="flex"
                justifyContent={"space-between"}
                alignItems="center"
              >
                {!isLoggedIn && (
                  <IconButton
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      toggleModal({
                        name: modal_keys.login_to_continue,
                        toggle: true,
                      });
                    }}
                    aria-label="wishlist"
                    size="lg"
                    rounded="full"
                    icon={<>{Icons.heart}</>}
                  />
                )}
                {isLoggedIn && (
                  <Link href="/wishlist">
                    <a>
                      <IconButton
                        variant="outline"
                        aria-label="wishlist"
                        size="lg"
                        icon={<>{Icons.heart}</>}
                      />
                    </a>
                  </Link>
                )}
                <SocialListing />
              </Box>
              <Box>
                <Button
                  rightIcon={Icons.close}
                  w="full"
                  textTransform="uppercase"
                  fontSize="sm"
                  textAlign="center"
                  variant="ghost"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MobileMenu;
