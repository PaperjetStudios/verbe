import { Box } from "@chakra-ui/react";

import styles from "./InnerBox.module.scss";

export type InnerBoxProps = { children };

const InnerBox: React.FC<InnerBoxProps> = ({ children }) => {
  return <Box className={styles.container}>{children}</Box>;
};

export default InnerBox;
