import React from "react";
import general from "./general.module.scss";

import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";

import { FormProvider, useForm } from "react-hook-form";
import TextField from "./inputs/textfield";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { axiosInstance } from "../../config/api";
import Router from "next/router";
import ModalBase from "../Modal/ModalBase";

const schema = yup
  .object({
    email: yup.string().email().required("Please insert your email"),
  })
  .required();

type FormForgotPasswordProps = {};

const FormForgotPassword: React.FC<FormForgotPasswordProps> = () => {
  const { onOpen, isOpen } = useDisclosure();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onClose = () => {
    Router.push("/");
  };

  const onSubmit = async (data: any) => {
    await axiosInstance()
      .post(`/api/auth/forgot-password`, {
        email: data.email,
      })
      .then((response: any) => {
        onOpen();
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
                name="email"
                label="Email Address"
                placeholder="Email Address"
              />

              <Button
                mt={4}
                variant="main"
                isLoading={methods.formState.isSubmitting}
                type="submit"
              >
                Reset Password
              </Button>
            </Stack>
          </form>
        </Box>
      </FormProvider>
      <ModalBase
        trigger="password_reset"
        disclosure={{ isOpen, onOpen, onClose }}
        actions={[]}
      >
        <></>
      </ModalBase>
    </>
  );
};

export default FormForgotPassword;
