import { Checkbox, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

type CheckboxProps = {
  label: string | React.ReactNode;
  name: string;
  defaultValue?: boolean;
};

const PJSCheckbox: React.FC<CheckboxProps> = ({
  name,
  label,
  defaultValue = false,
}) => {
  const methods = useFormContext();
  const errors = methods.formState.errors;

  return (
    <FormControl isInvalid={errors[name]}>
      <Controller
        control={methods.control}
        name={name}
        key={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value, ref } }) => (
          <Checkbox onChange={onChange} ref={ref} isChecked={value}>
            {label}
          </Checkbox>
        )}
      />

      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default PJSCheckbox;
