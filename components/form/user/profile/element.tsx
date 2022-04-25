import { HStack, Stack } from "@chakra-ui/react";
import TextField from "../../inputs/textfield";

type Props = {
  className?: string;
  style?: {};
  onSubmit: any;
  buttonEl: React.ReactElement;
};

const ProfileFormElement: React.FC<Props> = ({ buttonEl, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={5}>
        <HStack>
          <TextField
            name="FirstName"
            label="First Name"
            placeholder="First Name"
          />

          <TextField
            name="LastName"
            label="Last Name"
            placeholder="Last Name"
          />
        </HStack>

        <TextField
          name="Phone"
          label="Phone Number"
          placeholder="Phone Number"
        />

        <TextField name="email" label="Email" placeholder="Email Address" />
      </Stack>

      {buttonEl}
    </form>
  );
};

export default ProfileFormElement;
