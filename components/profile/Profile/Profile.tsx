import { Box, Button, Divider, HStack } from "@chakra-ui/react";
import useUser from "../../../hooks/useUser";
import ProfileForm from "../../form/user/profile/profile";
import Delete from "./Delete/Delete";

import styles from "./Profile.module.scss";

export type ProfileProps = {};

const Profile: React.FC<ProfileProps> = ({}) => {
  const { isLoggedIn, logoutMutation } = useUser();

  return (
    <Box className={styles.container}>
      <ProfileForm />
      <Divider pt={5} />
      <HStack pt={5} justifyContent="flex-end">
        <Button
          onClick={() => {
            logoutMutation.mutate();
          }}
        >
          Log out
        </Button>

        <Delete />
      </HStack>
    </Box>
  );
};

export default Profile;
