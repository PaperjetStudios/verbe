import React, { useState } from "react";
import general from "./general.module.scss";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Stack,
  Text,
} from "@chakra-ui/react";

import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "./inputs/textfield";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import Router, { useRouter } from "next/router";
import useUser from "../../hooks/useUser";

const schema = yup
  .object({
    email: yup.string().email().required("Please insert your email"),
    password: yup.string().required("Please insert your password"),
  })
  .required();

type FormLoginProps = {};

const FormLogin: React.FC<FormLoginProps> = () => {
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { reset, confirm } = router.query;

  const { logUserIn } = useUser();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setNotification("");
    setLoading(true);

    logUserIn(
      data,
      () => {
        Router.push("/profile");
        setLoading(false);
      },
      () => {
        setNotification(
          "Oops! We couldn't find that account, please try again."
        );
        setLoading(false);
      }
    );
  };

  return (
    <>
      {notification !== "" && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Not found!</AlertTitle>
          <AlertDescription>{notification}</AlertDescription>
          <CloseButton
            onClick={() => setNotification("")}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
      {confirm && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle mr={2}>Account Confirmed!</AlertTitle>
          <AlertDescription>
            Congratulations, please login with your details below.
          </AlertDescription>
        </Alert>
      )}
      {reset && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle mr={2}>Password Reset!</AlertTitle>
          <AlertDescription>
            Congratulations, please login with your new details below.
          </AlertDescription>
        </Alert>
      )}
      <FormProvider {...methods}>
        <Box className={general.container}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack gap={5}>
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
              <Text fontSize="sm">
                Don&apos;t have a profile?{" "}
                <Link passHref href="/profile/register">
                  <Text as="a" display={"inline-block"} fontWeight="600">
                    Register here
                  </Text>
                </Link>
              </Text>

              <Button
                mt={4}
                variant="main"
                isLoading={methods.formState.isSubmitting || loading}
                type="submit"
              >
                Log In
              </Button>
              <Text fontSize="sm" textAlign={"center"}>
                <Link href="/profile/forgot-password">
                  <a>Forgot your password?</a>
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </FormProvider>
    </>
  );
};

export default FormLogin;
