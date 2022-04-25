import styles from "./Loader.module.scss";

import { Box } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

type LoaderProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  contained?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ size = "md", contained = true }) => {
  const loaderElement = <Spinner size={size} />;
  if (contained) {
    return <Box className={styles.loaderContainer}>{loaderElement}</Box>;
  } else {
    return <Box className={styles.loaderUncontained}>{loaderElement}</Box>;
  }
};

export default Loader;
