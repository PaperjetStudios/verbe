import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useWizard } from "react-use-wizard";

import CheckoutIcon, { StepIcon } from "./common/CheckoutIcon";
import Totals from "./common/totals";

import styles from "./steps.module.scss";
import { useAtom } from "jotai";
import { Items } from "../../../../data/atoms/cart/cartAtoms";
import { Icons } from "../../../Common/icons";
import ClientOnly from "../../../Common/ClientOnly";

type StepProps = {
  handleCurrentStep?: () => void;
  hideSidebar?: boolean;
  disableNext?: boolean;
  children?: any;
};

const steps: StepIcon[] = [
  { title: "Your Order", icon: Icons.shoppingcart, ind: 1 },
  { title: "Your Info", icon: Icons.menu.userSolid, ind: 2 },
  { title: "Payment", icon: Icons.dollar, ind: 3 },
];

const StepBase: React.FC<StepProps> = ({
  handleCurrentStep,
  disableNext,
  children,
}) => {
  const {
    handleStep,

    isLastStep,
  } = useWizard();

  const [items] = useAtom(Items);

  const stepperRef = useRef();

  useEffect(() => {
    if (stepperRef.current) {
      //@ts-ignore
      stepperRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [stepperRef]);

  return (
    <>
      <Box ref={stepperRef} className={styles.stepper}>
        {steps.map((step) => {
          return <CheckoutIcon key={`checkout_${step.title}`} {...step} />;
        })}
      </Box>
      <ClientOnly>
        <Box display={["block", null, null, "flex"]} gap={5}>
          <Box
            mb={[5, null, null, 0]}
            width={["100%", null, null, "70%"]}
            className={styles.mainContain}
          >
            <Box>{children}</Box>
          </Box>

          <Box mb={[5, null, null, 0]} flex={1} position="relative">
            <Box position="sticky" className={styles.mainContain}>
              <Totals
                disableNext={disableNext}
                nextAction={handleCurrentStep}
              />
            </Box>
          </Box>
        </Box>
      </ClientOnly>
    </>
  );
};

export default StepBase;
