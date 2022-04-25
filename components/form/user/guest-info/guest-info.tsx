import { useEffect } from "react";

import { UseFormReturn } from "react-hook-form";
import { FormType } from "./types";

import GuestFormElement from "./element";
import { Box, Button } from "@chakra-ui/react";

type Props = {
  methods: UseFormReturn<FormType, object>;
};

const GuestInformationForm: React.FC<Props> = ({ methods }) => {
  return (
    <Box>
      <GuestFormElement
        buttonEl={
          <Button type="submit" mt={5} variant="main">
            Confirm Details
          </Button>
        }
      />
    </Box>
  );
};

export default GuestInformationForm;
