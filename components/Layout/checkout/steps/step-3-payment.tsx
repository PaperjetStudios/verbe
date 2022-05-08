import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Total } from "../../../../data/atoms/cart/cartAtoms";
import { GuestCheckout } from "../../../../data/atoms/checkout/checkoutAtoms";
import useUser from "../../../../hooks/useUser";

import StepBase from "./step-base";
import Widget from "./step3/Coupons/Widget/Widget";
import PayfastWidget from "./step3/Payment/PayfastWidget";

const Step3Cart: React.FC = () => {
  // Return promise
  const handleCurrentStep = () => {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  };

  //const { createOrder, loading } = useCheckout();

  const [guest] = useAtom(GuestCheckout);
  const { isLoggedIn } = useUser();

  //const [order] = useAtom(OrderGroup);
  const [totals] = useAtom(Total);
  const fullyPaid = false;
  /*
  useEffect(() => {
    if (orderGroup.Unique !== "") {
      if (fullyPaid) {
        Router.push("/order-confirmed");
      } else {
        //@ts-ignore
        document.getElementById("netcash").submit();
      }
    }
  }, [orderGroup, fullyPaid]);
*/
  console.log(guest.guestInfo);

  return (
    <StepBase handleCurrentStep={handleCurrentStep}>
      <Alert status="success">
        <AlertIcon />
        Please ensure all your details are correct before continuing
      </Alert>
      <Text py={5} fontWeight="bold" fontSize={"xl"}>
        Payment
      </Text>
      <Divider />
      {(guest.guestInfo.create_profile_check || isLoggedIn) && <Widget />}
      {!fullyPaid && <Text py={5}>You will be redirected to Payfast</Text>}

      <PayfastWidget />
    </StepBase>
  );
};

export default Step3Cart;
