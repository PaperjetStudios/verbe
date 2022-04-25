import { Box } from "@chakra-ui/react";

import styles from "./Component.module.scss";

export type ComponentProps = {};

const Component: React.FC<ComponentProps> = ({}) => {
  return <Box className={styles.container}></Box>;
};

export default Component;
