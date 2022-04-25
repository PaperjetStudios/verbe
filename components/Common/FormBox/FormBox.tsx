import { Box } from "@chakra-ui/react";

import styles from "./FormBox.module.scss";

export type FormBoxProps = { children };

const FormBox: React.FC<FormBoxProps> = ({ children }) => {
  return <Box className={styles.container}>{children}</Box>;
};

export default FormBox;
