"use client";

import { Box, FormLabel, Textarea } from "@chakra-ui/react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface TextAreaProps {
  placeholder: string;
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required: boolean;
}

const TextAreaContent: React.FC<TextAreaProps> = ({
  id,
  label,
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
      <Textarea
        color="gray.600"
        placeholder={placeholder}
        id={id}
        required
        {...register(id, { required })}
        size="sm"
        minHeight="120px"
      />
    </Box>
  );
};

export default TextAreaContent;
