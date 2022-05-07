import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { ReactElement, useState } from "react";
import cs from "../../../config/cs";
import { Icons } from "../../Common/icons";

import Responsive from "../../Common/Responsive";

import styles from "./Holder.module.scss";
import MobileMenu from "./MobileMenu/MobileMenu";

export type SideAction = {
  action: () => void;
  title: string;
};

export type HolderActions = {
  actions?: SideAction[];
  title?: string;
};

export type HolderProps = {
  title: string;

  menuItems: {
    label: string;
    icon?: React.ReactElement;
    link?: string;
  }[];
};

type HolderLayoutProps = HolderActions & {
  content: React.ReactNode;
  buttons?: React.ReactNode[];
};

export const root = "/profile";
export const rootOrder = "/profile/orders";

export const profile_menu = (props: any) =>
  ({
    title: "My Account",
    menuItems: [
      {
        label: "Basic Info",
        link: root,
      },
      {
        label: "Address",
        link: root + "/address",
      },
      {
        label: "Orders",
        link: rootOrder,
      },
    ],
  } as HolderProps);

const Holder: React.FC<HolderLayoutProps> = ({
  content,
  actions,
  title,
  buttons = [],
}) => {
  const router = useRouter();

  let typeProps: HolderProps = profile_menu({});

  const { title: sidebarTitle, menuItems } = typeProps;

  const currentPath = router.pathname;

  return (
    <Box className={styles.container}>
      <Responsive.Desktop>
        <Box className={styles.sideBar}>
          <Text as="h4">{sidebarTitle}</Text>

          <Divider pt={4} />
          <Box my="5" className={styles.menuItems}>
            {menuItems.map((item, index) => (
              <Box
                onClick={() => {
                  router.push(item.link);
                }}
                key={"menu_" + index}
                className={cs(styles.menuItem, {
                  [styles.currentMenuItem]: currentPath === item.link,
                })}
              >
                <Text as="span">{item.label}</Text>
                {Icons.chevron.right}
              </Box>
            ))}
          </Box>
        </Box>
      </Responsive.Desktop>

      <Box className={styles.content}>
        <Box className={styles.topHolder}>
          <Text fontWeight={600} fontSize={22}>
            {title}
          </Text>

          <Box>
            <Responsive.Mobile>
              <MobileMenu {...typeProps} />
            </Responsive.Mobile>

            {actions?.map((action, index) => (
              <Button
                key={"action_" + index}
                onClick={action.action}
                variant="outline"
                size="sm"
              >
                {action.title}
              </Button>
            ))}

            {buttons && <Box>{buttons}</Box>}
          </Box>
        </Box>
        <Divider pt={5} />
        <Box pt={5}>{content}</Box>
      </Box>
    </Box>
  );
};

export default Holder;
