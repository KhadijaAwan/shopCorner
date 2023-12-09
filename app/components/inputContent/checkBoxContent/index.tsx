"use client";

import { Flex, FormLabel, Checkbox } from "@chakra-ui/react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface CheckBoxProps {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
}

const CheckBoxContent: React.FC<CheckBoxProps> = ({ id, label, register }) => {
  return (
    <Checkbox colorScheme="green" id={id} required {...register(id)} size="md">
      <FormLabel fontSize="14px" fontFamily="monospace" color="gray.700" mt={2}>
        {label}
      </FormLabel>
    </Checkbox>
  );
};

export default CheckBoxContent;
