import { Box } from "@chakra-ui/react";
import ClientOnly from "../Common/ClientOnly";

import styles from "./InfoPage.module.scss";

export type InfoPageProps = { children: any };

const InfoPage: React.FC<InfoPageProps> = ({ children }) => {
  return (
    <ClientOnly>
      <Box className={styles.greyBacking}>
        <Box className={styles.container}>
          <Box className={styles.info}>{children}</Box>
        </Box>
      </Box>
    </ClientOnly>
  );
};

export default InfoPage;
