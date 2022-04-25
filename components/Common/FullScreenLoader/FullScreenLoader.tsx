import { Box } from "@chakra-ui/react";
import cs from "../../../config/cs";

import styles from "./FullScreenLoader.module.scss";

export type FullScreenLoaderProps = { status: boolean };

type Props = {
  title: string;
};
const Slash: React.FC<Props> = ({ title }) => {
  return (
    <Box className={styles[title]}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.64 21.07">
        <polygon points="0 3.88 13.59 10.53 0 17.18 0 21.07 18.64 11.95 18.64 9.12 0 0 0 3.88" />
      </svg>
    </Box>
  );
};

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ status }) => {
  return (
    <Box
      className={cs(
        styles.container,
        { [styles.hidden]: !status },
        { [styles.showing]: status }
      )}
    >
      <Box className={styles.loaderHolder}>
        <Slash title={"one"} />
        <Slash title={"two"} />
        <Slash title={"three"} />
      </Box>
    </Box>
  );
};

export default FullScreenLoader;
