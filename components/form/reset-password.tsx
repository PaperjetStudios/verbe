import React from "react";
import general from "./general.module.scss";

import { Box, Button, Stack } from "@chakra-ui/react";

import { FormProvider, useForm } from "react-hook-form";
import TextField from "./inputs/textfield";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { axiosInstance } from "../../config/api";
import Router, { useRouter } from "next/router";

const schema = yup
  .object({
    password: yup
      .string()
      .min(6, "Password should have atleast 6 characters")
      .required("Please insert your password"),
    passwordConfirmation: yup
      .string()
      .test("match", "Passwords do not match", (value, context) => {
        if (value && value !== context.parent.password) {
          return false;
        }
        return true;
      })
      .required("Please confirm your password"),
  })
  .required();

type FormResetPasswordProps = {};

const FormResetPassword: React.FC<FormResetPasswordProps> = () => {
  const router = useRouter();
  const { reset } = router.query;

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    await axiosInstance()
      .post(`/api/auth/reset-password`, {
        code: reset,
        ...data,
      })
      .then((response: any) => {
        Router.push("/profile/login?reset=true");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <FormProvider {...methods}>
        <Box className={general.container}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack gap={5}>
              <TextField
                name="password"
                label="Password"
                placeholder="Password"
                password
              />
              <TextField
                name="passwordConfirmation"
                label="Confirm Password"
                placeholder="Confirm Password"
                password
              />

              <Button
                mt={4}
                variant="main"
                isLoading={methods.formState.isSubmitting}
                type="submit"
              >
                Confirm New Password
              </Button>
            </Stack>
          </form>
        </Box>
      </FormProvider>
    </>
  );
};

export default FormResetPassword;
