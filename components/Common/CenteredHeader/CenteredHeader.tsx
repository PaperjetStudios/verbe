import { Box, Text } from "@chakra-ui/react";

import styles from "./CenteredHeader.module.scss";

export type CenteredHeaderProps = { title };

const CenteredHeader: React.FC<CenteredHeaderProps> = ({ title }) => {
  return (
    <Box className={styles.container}>
      <Text
        fontSize="4xl"
        letterSpacing={-1}
        textAlign={"center"}
        textTransform="uppercase"
        fontWeight="bold"
        mb={10}
      >
        {title}
      </Text>
    </Box>
  );
};

export default CenteredHeader;
