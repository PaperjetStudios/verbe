import { Box } from "@chakra-ui/react";
import cs from "../../../config/cs";

import styles from "./Badge.module.scss";

export type BadgeProps = { number: number; children: any; size?: "sm" | "lg" };

const Badge: React.FC<BadgeProps> = ({ number, children, size }) => {
  if (number === 0) {
    return children;
  }
  return (
    <Box className={cs(styles.badgeHolder, { [styles.large]: size === "lg" })}>
      <Box className={styles.badgeIcon}>{number}</Box>
      {children}
    </Box>
  );
};

export default Badge;
