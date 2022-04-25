import React, { useState } from "react";
import general from "./general.module.scss";

import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";

import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "./inputs/textfield";

import Router from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { axiosInstance } from "../../config/api";
import ModalBase from "../Modal/ModalBase";

const schema = yup
  .object({
    FirstName: yup.string().required("Please insert your first name"),
    LastName: yup.string().required("Please insert your last name"),

    email: yup
      .string()
      .email("Please insert a valid email address")
      .test(
        "Unique Email",
        "That email already exists, have you signed up before?",
        function (value) {
          return new Promise((resolve, reject) => {
            axiosInstance()
              .get(`/utils/validEmail?email=${value}`)
              .then((validCheck: any) => {
                resolve(!validCheck.data);
              });
          });
        }
      )
      .required(),
    password: yup
      .string()
      .min(6, "Password should have atleast 6 characters")
      .required("Please insert your password"),
    confirmed_password: yup
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

type FormLoginProps = {};

const FormRegister: React.FC<FormLoginProps> = () => {
  const { onOpen, isOpen } = useDisclosure();

  const onClose = () => {
    Router.push("/");
  };

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    await axiosInstance()
      .post(`/api/auth/local/register`, {
        username: data.FirstName + " " + data.LastName,
        ...data,
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
                name="FirstName"
                label="First Name"
                placeholder="First Name"
              />
              <TextField
                name="LastName"
                label="Last Name"
                placeholder="Last Name"
              />
              <TextField
                name="email"
                label="Email Address"
                placeholder="Email Address"
              />
              <TextField
                name="password"
                label="Password"
                placeholder="Password"
                password
              />
              <TextField
                name="confirmed_password"
                label="Confirm Password"
                placeholder="Confirm Password"
                password
              />
              <Text fontSize="sm">
                Already have a profile?{" "}
                <Link passHref href="/profile/login">
                  <Text as="a" display={"inline-block"} fontWeight="600">
                    Login here
                  </Text>
                </Link>
              </Text>
              <Button
                mt={4}
                variant="main"
                isLoading={methods.formState.isSubmitting}
                type="submit"
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </FormProvider>
      <ModalBase
        trigger="thank_you_register"
        disclosure={{ isOpen, onOpen, onClose }}
        actions={[]}
      >
        <></>
      </ModalBase>
    </>
  );
};

export default FormRegister;
