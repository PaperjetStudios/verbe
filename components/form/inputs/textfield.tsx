import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type TextFieldProps = {
  label: string;
  placeholder: string;
  name: string;
  password?: boolean;
  textarea?: boolean;
};

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  password = false,
  textarea = false,
}) => {
  const methods = useFormContext();
  const errors = methods.formState.errors;

  const type = password ? "password" : "";

  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {!textarea && (
        <Input
          type={type}
          id={name}
          placeholder={placeholder}
          {...methods.register(name)}
        />
      )}{" "}
      {textarea && (
        <Textarea
          id={name}
          placeholder={placeholder}
          {...methods.register(name)}
        />
      )}
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
