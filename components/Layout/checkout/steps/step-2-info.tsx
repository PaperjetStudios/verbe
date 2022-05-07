import { Box, Divider, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
import { useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useWizard } from "react-use-wizard";
import { unlockStep } from "../../../../data/atoms/cart/cartAtoms";
import {
  GuestCheckout,
  SetAddress,
} from "../../../../data/atoms/checkout/checkoutAtoms";
import useUser from "../../../../hooks/useUser";

import AddressList from "../../../form/user/address/AddressList/AddressList";

import GuestInformationForm from "../../../form/user/guest-info/guest-info";
import { schema } from "../../../form/user/guest-info/schema";
import { FormType } from "../../../form/user/guest-info/types";
import ProfileForm from "../../../form/user/profile/profile";

import StepBase from "./step-base";

const Step2Cart: React.FC = () => {
  const [unlockedSteps, unlock] = useAtom(unlockStep);
  const [guestInfo, setGuestInfo] = useAtom(GuestCheckout);
  const { isLoggedIn, user } = useUser();
  const [selectedAddress] = useAtom(SetAddress);

  const { nextStep } = useWizard();

  const guestFormRef = useRef(null);

  const methods = useForm<FormType>({
    defaultValues: guestInfo.guestInfo,
    resolver: yupResolver(schema),
  });

  const submit: SubmitHandler<FormType> = (data) => {
    try {
      setGuestInfo({ guestInfo: data });
      unlock(3);
      nextStep();
    } catch (e) {
      console.log(e);
    }
  };

  // Return promise
  const handleCurrentStep = () => {
    if (!isLoggedIn) {
      guestFormRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    } else {
      let goAhead = false;

      if (selectedAddress !== -1) {
        goAhead = true;
      }

      if (goAhead) {
        unlock(3);
        nextStep();
      }
    }
  };

  return (
    <StepBase handleCurrentStep={handleCurrentStep}>
      <Text pb={5} fontWeight="bold" fontSize={"xl"}>
        {isLoggedIn ? "Your Information" : "Your Information"}
      </Text>
      <Divider />
      <Box pt={5}>
        {!isLoggedIn && (
          <FormProvider {...methods}>
            <form ref={guestFormRef} onSubmit={methods.handleSubmit(submit)}>
              <GuestInformationForm methods={methods} />
            </form>
          </FormProvider>
        )}
        {isLoggedIn && (
          <>
            <ProfileForm buttonText="update" />
            <>
              <Text pt={5} pb={5} fontWeight="bold" fontSize={"xl"}>
                Your Address
              </Text>
              <Divider />
              <Box pt={5}>{<AddressList />}</Box>
            </>
          </>
        )}
      </Box>
    </StepBase>
  );
};

export default Step2Cart;
