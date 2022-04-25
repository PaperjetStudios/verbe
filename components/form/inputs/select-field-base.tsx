import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { Icons } from "../../Common/icons";

type SelectItems = {
  label: string;
  value: any;
  disabled?: boolean;
};
type SelectFieldBaseProps = {
  label: string;
  disabled?: boolean;
  value: any;
  onChange: (val: any, label?: any) => void;
  items: SelectItems[];
  icon?: React.ReactNode;
};

const SelectFieldBase: React.FC<SelectFieldBaseProps> = ({
  items,
  label,
  value,
  onChange,
  disabled = false,
  icon = Icons.chevron.down,
}) => {
  return (
    <Menu>
      <MenuButton
        disabled={disabled}
        width={"100%"}
        as={Button}
        rightIcon={icon}
      >
        {value ? value : label}
      </MenuButton>
      <MenuList maxH={300} overflow="scroll">
        {items.map((item) => {
          if (!item.disabled) {
            return (
              <MenuItem
                onClick={() => {
                  onChange(item.value, item.label);
                }}
                key={item.label}
                value={item.value}
              >
                {item.label}
              </MenuItem>
            );
          }
        })}
      </MenuList>
    </Menu>
  );
};

export default SelectFieldBase;
