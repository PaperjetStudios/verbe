import React, { useEffect, useState } from "react";
import general from "./general.module.scss";

import {
  Box,
  Button,
  HStack,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";

import { FormProvider, useForm } from "react-hook-form";
import TextField from "./inputs/textfield";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { axiosInstance } from "../../config/api";

const schema = yup
  .object({
    email: yup.string().email().required("Please insert a valid email address"),
  })
  .required();

type FormNewsletterProps = {};

const FormNewsletter: React.FC<FormNewsletterProps> = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { email } = data;

    try {
      await axiosInstance()
        .post(`/newsletter/add`, {
          email: email,
        })
        .then((res) => {
          console.log(res.data);

          if (res.data) {
            setSuccess(true);
          } else {
            setFail(true);
          }
        });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return (
    <>
      {success ||
        (fail && (
          <>
            {fail && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  You are already subscribed to our newsletter.
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert status="success">
                <AlertIcon />
                <AlertDescription>
                  You have been subscribed to our newsletter.
                </AlertDescription>
              </Alert>
            )}
          </>
        ))}
      {!success && !fail && (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <HStack alignItems={"flex-start"} gap={1}>
                <TextField
                  size="sm"
                  name="email"
                  label=""
                  placeholder="Email Address..."
                />

                <Button
                  fontSize="xs"
                  width="50%"
                  isLoading={methods.formState.isSubmitting || loading}
                  type="submit"
                  bg="#000"
                  color="#fff"
                  textTransform={"uppercase"}
                >
                  Subscribe
                </Button>
              </HStack>
            </form>
          </FormProvider>
        </>
      )}
    </>
  );
};

export default FormNewsletter;
