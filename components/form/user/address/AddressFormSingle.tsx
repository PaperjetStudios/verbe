import { useEffect, useState } from "react";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Address } from "./types";

import { emptyAddress, schema } from "./schema";

import { editAddresses } from "./state";

import { Box, Button, Divider, Stack } from "@chakra-ui/react";
import TextField from "../../inputs/textfield";
import useUser from "../../../../hooks/useUser";

type Props = {
  id?: number | string;
  callback: () => void;
};

export type UpdateAddressType = {
  showing: boolean;
  addressId: number | string;
};

const AddressFormSingle: React.FC<Props> = ({ callback, id = -1 }) => {
  const { user, userMutation } = useUser();
  const userData = user.user;

  // FORM
  const methods = useForm<Address>({
    defaultValues: emptyAddress,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id > -1) {
      methods.reset(userData.Address[id]);
    }
  }, [id, userData, methods]);

  const submit: SubmitHandler<Address> = (data) => {
    const transformedState = editAddresses(userData, data, id, false);

    try {
      if (transformedState !== null) {
        userMutation.mutate({
          Address: transformedState.Address,
        });

        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)}>
          <Stack spacing={5}>
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
          </Stack>
          <Divider pt={5} />
          <Button mt={5} type="submit" variant="main" isFullWidth={true}>
            {id !== -1 ? "Update Address" : "Add Address"}
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddressFormSingle;
