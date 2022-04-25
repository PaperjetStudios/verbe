import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { omit } from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { parseAsInt } from "../../../config/util";

type NumberFieldProps = NumberInputFieldProps & {
  label: string;
  name: string;
  precision?: number;
  prefix?: string;
  min?: number;
};

const NumberField: React.FC<NumberFieldProps> = ({
  name,
  precision = 2,
  label,
  prefix,
  min = 1.0,
}) => {
  const methods = useFormContext();
  const errors = methods.formState.errors;

  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor={name}>{label}</FormLabel>

      <Controller
        control={methods.control}
        name={name}
        key={name}
        defaultValue={false}
        render={({ field: { onChange, value, ref } }) => (
          <Box display="flex">
            {prefix && (
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text fontWeight="bold" mr={3}>
                  {prefix}
                </Text>
              </Box>
            )}
            <NumberInput
              precision={precision}
              value={value}
              onChange={(valueString) => onChange(parse(valueString))}
              min={min}
              defaultValue={0.0}
              width={"100%"}
            >
              <NumberInputField />
            </NumberInput>
          </Box>
        )}
      />

      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default NumberField;
