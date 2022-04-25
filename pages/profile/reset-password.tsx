import { Box } from "@chakra-ui/react";

import { ReactElement } from "react";
import { dehydrate, QueryClient } from "react-query";

import FormResetPassword from "../../components/form/reset-password";
import useUser from "../../hooks/useUser";

const pageQuery = "profile";

const ResetPassword = () => {
  const { user } = useUser();

  return (
    <Box>
      <FormResetPassword />
    </Box>
  );
};

export default ResetPassword;
