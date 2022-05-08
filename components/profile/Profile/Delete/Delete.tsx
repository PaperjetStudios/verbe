import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { axiosInstance, createStrapiAxios } from "../../../../config/api";
import useUser from "../../../../hooks/useUser";
import ModalAreYouSure from "../../../Modal/AreYouSure";

import styles from "./Delete.module.scss";

export type DeleteProps = {};

const Delete: React.FC<DeleteProps> = ({}) => {
  const { user, deleteMutation, isLoggedIn, logoutMutation } = useUser();
  const [isRemoving, setRemoving] = useState(false);
  const areYouSureDisclosure = useDisclosure();

  console.log(user);

  const removeUser = async () => {
    setRemoving(true);
    deleteMutation.mutate();
  };

  // logoutMutation.mutate();
  return (
    <>
      <Button
        onClick={() => areYouSureDisclosure.onOpen()}
        colorScheme="red"
        isLoading={isRemoving}
      >
        Delete Profile
      </Button>
      <ModalAreYouSure
        disclosure={areYouSureDisclosure}
        action={() => {
          removeUser();
        }}
      ></ModalAreYouSure>
    </>
  );
};

export default Delete;
