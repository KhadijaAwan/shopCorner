"use client";

import { useCallback } from "react";
import { ProductImageFormat } from "../addProduct";
import { useDropzone } from "react-dropzone";
import { Box, Input, Text, Flex} from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";

interface SetImageProps {
  item: ProductImageFormat;
  handlePhoto: (value: File) => void;
}

const SelectImage: React.FC<SetImageProps> = ({ item, handlePhoto }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handlePhoto(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".png", ".jpeg"] },
  });

  return (
    <Box {...getRootProps()}>
      <input type="file" {...getInputProps()} />
      {isDragActive ? (
        <Text>Upload Image</Text>
      ) : (
        <Flex direction="row" mt={4}>
          <MdFileUpload/> 
        <Text fontFamily="monospace" ml="5px" fontSize="13px" mt="-3px" color="gray.700">
          {item.colorName} Image
        </Text>
        </Flex>
      )}
    </Box>
  );
};

export default SelectImage;
