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

const Step3Cart: React.FC = () => {
  // Return promise
  const handleCurrentStep = () => {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  };

  //const { createOrder, loading } = useCheckout();

  const [guest] = useAtom(GuestCheckout);
  const { user } = useUser();

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
      {!fullyPaid && <Text py={5}>You will be redirected to Payfast</Text>}
      {fullyPaid && <Text py={5}>Please confirm below</Text>}
      <HStack>
        <Button
          // isLoading={loading}
          variant="main"
          onClick={() => {
            /*   createOrder(false, (error) => {
              console.log(error);
            });*/
          }}
        >
          {!fullyPaid ? "Pay Now" : "Confirm"}
        </Button>
      </HStack>
      {/*  <form
        id="netcash"
        target="_top"
        method="POST"
        action="https://paynow.netcash.co.za/site/paynow.aspx"
      >
        <input
          type="hidden"
          name="m1"
          value="6d1797f8-4adc-4254-8074-c0992b1c9982"
        />
        <input
          type="hidden"
          name="m2"
          value="24ade73c-98cf-47b3-99be-cc7b867b3080"
        />
        <input type="hidden" name="p2" value={orderGroup.Unique} />
        <input
          type="hidden"
          name="p3"
          value={`${
            user?.user?.FirstName
              ? user.user.FirstName
              : guest.guestInfo.FirstName
          } ${
            user?.user?.LastName
              ? user?.user?.LastName
              : guest.guestInfo.LastName
          } - ${orderGroup.Unique}`}
        />
        <input
          type="hidden"
          name="p4"
          value={orderGroup.Total - walletAmount}
        />
        <input type="hidden" name="m4" value={orderGroup.Unique} />
        <input type="hidden" name="m5" value={walletAmount} />
        <input
          type="hidden"
          name="m6"
          value={user?.user?.id ? user.user.id : -1}
        />
        <input
          type="hidden"
          name="m9"
          value={user?.user?.email ? user.user.email : guest.guestInfo.email}
        />
        </form>*/}
    </StepBase>
  );
};

export default Step3Cart;
