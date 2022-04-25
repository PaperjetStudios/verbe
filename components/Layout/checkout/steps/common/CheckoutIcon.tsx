import { Box, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useWizard } from "react-use-wizard";
import cs from "../../../../../config/cs";
import { unlockStep } from "../../../../../data/atoms/cart/cartAtoms";

import styles from "./CheckoutIcon.module.scss";

export type StepIcon = {
  title: string;
  icon: React.ReactElement;
  ind: number;
};

const CheckoutIcon: React.FC<StepIcon> = ({ title, icon, ind }) => {
  const [unlockedSteps, unlock] = useAtom(unlockStep);

  const { goToStep, activeStep } = useWizard();

  const goto = () => {
    if (unlockedSteps >= ind) {
      goToStep(ind - 1);
    }
  };

  const isActive = activeStep === ind - 1;

  return (
    <>
      <Box className={styles.container} onClick={() => goto()}>
        <Box
          className={cs(styles.iconContainer, {
            [styles.activeIcon]: isActive,
          })}
        >
          {icon}
        </Box>
        <Text className={styles.iconText}>{title}</Text>
      </Box>
      {ind === 1 && (
        <Box
          className={cs(styles.line, {
            [styles.activeLine]: activeStep > 0,
          })}
        ></Box>
      )}
      {ind === 2 && (
        <Box
          className={cs(styles.line, {
            [styles.activeLine]: activeStep > 1,
          })}
        ></Box>
      )}
    </>
  );
};

export default CheckoutIcon;
