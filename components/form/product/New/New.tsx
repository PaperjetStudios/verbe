import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Box, Button, Divider, Stack, useToast } from "@chakra-ui/react";
import TextField from "../../inputs/textfield";
import axios from "axios";
import Router from "next/router";
import { useState } from "react";

type Props = {
  callback: () => void;
};

type FormType = {
  Title: string;
  Description: string;
};

const schema = yup
  .object({
    Description: yup.string().required("Description is required"),
    Title: yup.string().required("Title is Required"),
  })
  .required();

const NewProduct: React.FC<Props> = ({ callback }) => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  // FORM
  const methods = useForm<FormType>({
    defaultValues: {
      Title: "",
      Description: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormType) => {
    setLoading(true);
    await axios
      .post("/api/product", {
        type: "create",
        data: {
          Title: data.Title,
          Description: data.Description,
          Condition: "Used",
        },
      })
      .then((res) => {
        console.log("RESULT", res);
        if (res.data.id) {
          Router.push("/profile/edit-product/" + res.data.id);
        }
      })
      .catch((e) => {
        toast({
          title: "An error occurred.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    setLoading(false);
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <TextField
              name="Title"
              label="New Product Title"
              placeholder="Title..."
            />
            <TextField
              name="Description"
              label="New Product Description"
              placeholder="Description..."
              textarea
            />
          </Stack>
          <Divider pt={5} />
          <Button
            isLoading={loading}
            mt={5}
            type="submit"
            variant="main"
            isFullWidth={true}
          >
            Create New Product
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default NewProduct;
