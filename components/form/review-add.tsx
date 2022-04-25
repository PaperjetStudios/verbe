import React, { useState } from "react";
import general from "./general.module.scss";

import { Box, Button, Stack } from "@chakra-ui/react";

import { FormProvider, useForm } from "react-hook-form";
import TextField from "./inputs/textfield";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import Rating from "./inputs/rating";

import { useMutation } from "react-query";
import useUser from "../../hooks/useUser";

const schema = yup
  .object({
    Username: yup.string().required("Please insert a name"),
    Title: yup.string().required("Please insert a title"),
    Message: yup.string().required("Please insert a message"),
    Rating: yup.number().min(1).max(5).required("Please add a rating"),
  })
  .required();

type FormReviewAddProps = {
  id: number | string;
  type: "Product" | "Store";
  onSuccess: () => any;
};

const FormReviewAdd: React.FC<FormReviewAddProps> = ({
  id,
  type = "Product",
  onSuccess,
}) => {
  const { user } = useUser();

  const methods = useForm({
    defaultValues: {
      Rating: 3,
      Username: user.user.FirstName + " " + user.user.LastName,
    },
    resolver: yupResolver(schema),
  });

  let mutation = useMutation(
    (data) =>
      axios.post("/api/mutate", {
        type: "review",
        variables: data,
      }),
    {
      onSuccess: (data) => {
        onSuccess();
      },
    }
  );

  const onSubmit = async (data: any) => {
    let newData;

    if (type === "Product") {
      newData = { Product: id, ...data };
    } else {
      newData = { Store: id, ...data };
    }

    return await mutation.mutate(newData);
  };

  return (
    <>
      <FormProvider {...methods}>
        <Box className={general.modalContainer}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack gap={5}>
              <TextField
                name="Username"
                label="Username"
                placeholder="Username"
              />
              <TextField name="Title" label="Title" placeholder="Title" />
              <TextField
                name="Message"
                textarea
                label="Message"
                placeholder="Message"
              />
              <Rating label="Rating" name="Rating" />
              <Button
                mt={4}
                variant="main"
                isLoading={methods.formState.isSubmitting}
                type="submit"
              >
                Add Review
              </Button>
            </Stack>
          </form>
        </Box>
      </FormProvider>
    </>
  );
};

export default FormReviewAdd;
