import { useEffect, useState } from "react";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Box, Button, Divider, Stack } from "@chakra-ui/react";
import TextField from "./inputs/textfield";
import axios from "axios";
import useUser from "../../hooks/useUser";

type Props = {
  subject?: string;
  storeId?: string | number;
  callback: (id: number | string) => void;
};

type FormType = {
  subject: string;
  message: string;
  username: string;
};

const schema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
  username: yup.string().required("Username is required"),
});

const ContactSeller: React.FC<Props> = ({
  callback,
  subject = "",
  storeId,
}) => {
  const { user } = useUser();
  const userData = user.user;

  // FORM
  const methods = useForm<FormType>({
    defaultValues: {
      subject: subject,
      message: "",
      username: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    methods.reset({
      username: userData.FirstName,
      subject: subject,
    });
  }, [userData, methods]);

  const submit: SubmitHandler<FormType> = async (data) => {
    try {
      axios
        .post("/api/chat", {
          variables: {
            subject: data.subject,
            message: data.message,
            username: data.username,
            store: storeId,
          },
        })
        .then((res) => {
          callback(res.data.id);
          console.log(res.data.id);
        });
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
              name="username"
              label="Username"
              placeholder="Your username"
            />
            <TextField
              name="subject"
              label="Subject"
              placeholder="Subject..."
            />
            <TextField
              name="message"
              label="Message"
              placeholder="Message..."
              textarea
            />
          </Stack>
          <Divider pt={5} />
          <Button mt={5} type="submit" variant="main" isFullWidth={true}>
            Send Message
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default ContactSeller;
