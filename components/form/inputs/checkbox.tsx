import { Checkbox, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

type CheckboxProps = {
  label: string | React.ReactNode;
  name: string;
};

const PJSCheckbox: React.FC<CheckboxProps> = ({ name, label }) => {
  const methods = useFormContext();
  const errors = methods.formState.errors;

  return (
    <FormControl isInvalid={errors[name]}>
      <Controller
        control={methods.control}
        name={name}
        key={name}
        defaultValue={false}
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
