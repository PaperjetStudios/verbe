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
  VStack,
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

type FormNewsletterProps = {
  closeModal: () => void;
};

const FormNewsletterPopup: React.FC<FormNewsletterProps> = ({ closeModal }) => {
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
            closeModal();
            //setSuccess(true);
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

  const hideNotifications = success || fail;

  return (
    <>
      {hideNotifications && (
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
      )}
      {!hideNotifications && (
        <>
          <FormProvider {...methods}>
            <form
              style={{ width: "80%", padding: "40px 0 80px" }}
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <VStack justifyContent={"center"} gap={1}>
                <TextField
                  sx={{
                    background: "#fff",
                    border: "none",
                    padding: "5px 20px",
                    width: "100%",
                  }}
                  size="sm"
                  name="email"
                  label=""
                  placeholder="Email Address..."
                />

                <Button
                  fontSize="md"
                  isLoading={methods.formState.isSubmitting || loading}
                  type="submit"
                  bg="#999"
                  color="#fff"
                  textTransform={"uppercase"}
                  sx={{
                    rounded: "none",
                  }}
                >
                  Send
                </Button>
              </VStack>
            </form>
          </FormProvider>
        </>
      )}
    </>
  );
};

export default FormNewsletterPopup;
