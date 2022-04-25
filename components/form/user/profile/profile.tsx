import { useEffect, useState } from "react";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import ProfileFormElement from "./element";
import { empty, FormType } from "./types";

import { schema } from "./schema";
import { Box, Button } from "@chakra-ui/react";
import useUser from "../../../../hooks/useUser";

type Props = {
  className?: string;
  style?: {};
  buttonText?: string;
};

const ProfileForm: React.FC<Props> = ({
  className,
  style,
  buttonText = "Update",
}) => {
  //const [userData, setUserData] = useState(empty);
  const { user, userMutation } = useUser();

  const methods = useForm<FormType>({
    defaultValues: empty,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user?.user) {
      methods.reset({ ...user.user, oldEmail: user.user.email });
    }
    return null;
  }, [user, methods]);

  if (!user) {
    return <></>;
  }

  const submit: SubmitHandler<FormType> = (data) => {
    try {
      userMutation.mutate({
        FirstName: data.FirstName,
        LastName: data.LastName,
        Phone: data.Phone,
        email: data.email,
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (!user) {
    return <></>;
  }

  return (
    <Box>
      <FormProvider {...methods}>
        <ProfileFormElement
          buttonEl={
            <>
              {methods.formState.isDirty && (
                <Button mt={5} type="submit" variant="main" isLoading={!user}>
                  {buttonText}
                </Button>
              )}
            </>
          }
          onSubmit={methods.handleSubmit(submit)}
        />
      </FormProvider>
    </Box>
  );
};

export default ProfileForm;
