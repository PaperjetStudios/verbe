import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Icons } from "../../Common/icons";

import styles from "./ratings.module.scss";

type RatingProps = {
  name: string;
  label: string;
};
const Rating: React.FC<RatingProps> = ({ name, label }) => {
  const methods = useFormContext();
  const errors = methods.formState.errors;
  const value = methods.watch(name);

  const setValue = (value: number) => {
    methods.setValue(name, value);
  };

  let elements = [];

  for (let i = 1; i < 6; i++) {
    if (i > value) {
      elements.push(
        <Button
          onClick={() => setValue(i)}
          key={"star-" + i}
          className={styles.filledStar}
        >
          {Icons.star}
        </Button>
      );
    } else {
      elements.push(
        <Button
          onClick={() => setValue(i)}
          key={"star-" + i}
          className={styles.emptyStar}
        >
          {Icons.starFilled}
        </Button>
      );
    }
  }

  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor={`${name}`}>{label}</FormLabel>
      <Box>{elements}</Box>
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Rating;
