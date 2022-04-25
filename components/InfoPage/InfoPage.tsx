import { Box } from "@chakra-ui/react";

import styles from "./InfoPage.module.scss";

export type InfoPageProps = { children: any };

const InfoPage: React.FC<InfoPageProps> = ({ children }) => {
  return (
    <Box className={styles.greyBacking}>
      <Box className={styles.container}>
        <Box className={styles.info}>{children}</Box>
      </Box>
    </Box>
  );
};

export default InfoPage;
