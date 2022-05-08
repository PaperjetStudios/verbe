import { Box, Text, Divider } from "@chakra-ui/react";

import styles from "./InfoBox.module.scss";

export type InfoBoxProps = {
  title: string;
  children: React.ReactNode;
};

const InfoBox: React.FC<InfoBoxProps> = ({ children, title }) => {
  return (
    <Box className={styles.container}>
      <Text as="h4" className={styles.title}>
        {title}
      </Text>

      <Box className={styles.inner}>{children}</Box>
    </Box>
  );
};

export default InfoBox;
