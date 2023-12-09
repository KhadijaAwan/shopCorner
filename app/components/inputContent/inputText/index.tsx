"use client";

import { Box, FormLabel, Input } from "@chakra-ui/react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputTextProps {
  placeholder: string;
  id: string;
  label: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  id,
  label,
  type,
  register,
  errors,
  required,
  placeholder,
}) => {
  return (
    <Box>
      <FormLabel fontSize="15px" fontFamily="monospace" color="gray.700">
        {label}
      </FormLabel>
      <Input
        color="gray.600"
        type={type}
        placeholder={placeholder}
        id={id}
        required
        {...register(id, { required })}
        size="sm"
      />
    </Box>
  );
};

export default InputText;
