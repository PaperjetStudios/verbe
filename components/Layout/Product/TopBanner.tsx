import { Box, Text, IconButton } from "@chakra-ui/react";
import Link from "next/link";

import styles from "./TopBanner.module.scss";

type TopBannerProps = {
  title: string;
};

const TopBanner: React.FC<TopBannerProps> = ({ title }) => {
  return (
    <Box className={styles.strip}>
      <Box className={styles.inner}>
        <Link href="/">
          <a>
            <Text>Home</Text>
          </a>
        </Link>{" "}
        / <Text>{title}</Text>
      </Box>
    </Box>
  );
};

export default TopBanner;
