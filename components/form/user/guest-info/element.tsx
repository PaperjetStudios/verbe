import { HStack, Stack, Box, Divider } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { AddressRequired } from "../../../../data/atoms/checkout/checkoutAtoms";

import PJSCheckbox from "../../inputs/checkbox";
import TextField from "../../inputs/textfield";

type Props = {
  className?: string;
  style?: {};
  buttonEl: React.ReactElement;
};

const GuestFormElement: React.FC<Props> = ({ buttonEl }) => {
  const { watch, setValue } = useFormContext(); // retrieve all hook methods

  const [addressRequired] = useAtom(AddressRequired);
  useEffect(() => {
    setValue("addressRequired", addressRequired);
    setValue("create_profile_check", true);
  }, [addressRequired]);

  const create_profile_checked = watch("create_profile_check");

  return (
    <>
      <Stack spacing={5}>
        <HStack>
          <TextField
            name="FirstName"
            label="First Name"
            placeholder="First Name"
          />

          <TextField
            name="LastName"
            label="Last Name"
            placeholder="Last Name"
          />
        </HStack>
        <Box>
          <TextField
            name="Phone"
            label="Phone Number"
            placeholder="Phone Number"
          />
        </Box>

        <TextField name="email" label="Email" placeholder="Email Address" />

        {/* <PJSCheckbox name="create_profile_check" label="Create an account?" />

        {create_profile_checked && ( */}
        <HStack>
          <TextField
            name="password"
            label="Password"
            placeholder="Password"
            password
          />

          <TextField
            name="confirm_password"
            label="Confirm Password"
            placeholder="Confirm Password"
            password
          />
        </HStack>

        {/* })}*/}

        {addressRequired && (
          <>
            <Divider />

            <TextField
              name="Street_Address_1"
              label="Street Address Line 1"
              placeholder="Street Address Line 1"
            />
            <TextField
              name="Street_Address_2"
              label="Street Address Line 2"
              placeholder="Street Address Line 2"
            />
            <TextField name="Suburb" label="Suburb" placeholder="Suburb" />
            <TextField name="City" label="City" placeholder="City" />
            <TextField name="Country" label="Country" placeholder="Country" />
            <TextField
              name="Zip_Code"
              label="Zip Code"
              placeholder="Zip Code"
            />
          </>
        )}
      </Stack>
      {buttonEl}
    </>
  );
};

export default GuestFormElement;
