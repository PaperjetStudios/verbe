import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

import SelectFieldBase from "./select-field-base";

type SelectItems = {
  label: string;
  value: string;
};
type SelectFieldProps = {
  label: string;
  name: string;
  items: SelectItems[];
};

const SelectField: React.FC<SelectFieldProps> = ({ name, label, items }) => {
  const methods = useFormContext();
  const errors = methods.formState.errors;

  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor={name}>{label}</FormLabel>

      <Controller
        control={methods.control}
        name={name}
        key={name}
        defaultValue={false}
        render={({ field: { onChange, value, ref } }) => (
          <SelectFieldBase
            onChange={onChange}
            value={value}
            label={label}
            items={items}
          />
        )}
      />

      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default SelectField;

/*

 <Menu>
            <MenuButton as={Button} rightIcon={Icons.chevron.down}>
              {value ? value : label}
            </MenuButton>
            <MenuList>
              {items.map((item) => {
                return (
                  <MenuItem
                    onClick={() => {
                      onChange(item.value);
                    }}
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>*/
