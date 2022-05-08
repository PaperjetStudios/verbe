import { HStack, Stack, Box, Divider, Text, Link } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import PJSCheckbox from "../../inputs/checkbox";
import TextField from "../../inputs/textfield";
import NextLink from "next/link";

type Props = {
  className?: string;
  style?: {};
  buttonEl: React.ReactElement;
};

const GuestFormElement: React.FC<Props> = ({ buttonEl }) => {
  const { watch, setValue } = useFormContext(); // retrieve all hook methods

  useEffect(() => {
    setValue("communications", true);
    setValue("addressRequired", true);
    setValue("create_profile_check", true);
  }, []);

  const create_profile_checked = watch("create_profile_check");

  return (
    <>
      <Stack spacing={5}>
        <HStack flexDir={["column", "row"]} gap={3}>
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

        <PJSCheckbox
          defaultValue={true}
          name="create_profile_check"
          label="Create an account?"
        />

        {create_profile_checked && (
          <>
            <HStack flexDir={["column", "row"]} gap={3}>
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
            <PJSCheckbox
              defaultValue={true}
              name="communications"
              label={<Text>I want to receive communications</Text>}
            />
            <PJSCheckbox
              defaultValue={true}
              name="termsAndConditions"
              label={
                <Text>
                  I agree to the{" "}
                  <NextLink href="/terms-and-conditions" passHref>
                    <Link textDecoration={"underline"}>
                      terms and conditions
                    </Link>
                  </NextLink>
                </Text>
              }
            />
          </>
        )}

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
          <TextField name="Province" label="Province" placeholder="Province" />
          <TextField name="City" label="City" placeholder="City" />
          <TextField name="Country" label="Country" placeholder="Country" />
          <TextField name="Zip_Code" label="Zip Code" placeholder="Zip Code" />
        </>
      </Stack>
      {buttonEl}
    </>
  );
};

export default GuestFormElement;
