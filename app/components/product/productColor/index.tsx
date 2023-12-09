"use client";
import { Box, Text, HStack } from "@chakra-ui/react";
import { ChooseColorImage, ProductCart } from "../productInfo";

interface SetColor {
  pictures: ChooseColorImage[];
  cartProduct: ProductCart;
  selectColor: (value: ChooseColorImage) => void;
}

const ProductColors: React.FC<SetColor> = ({
  pictures,
  cartProduct,
  selectColor,
}) => {
  console.log("Pictures = ", pictures);
  return (
    <Box width="100%">
      <Text
        mb={4}
        fontSize="15px"
        fontWeight="bold"
        fontFamily="monospace"
        color="gray.700"
      >
        Colors Available
      </Text>
      <HStack my={3}>
        {pictures.map((p) => (
          <Box
            key={p.colorName}
            onClick={() => selectColor(p)}
            width="15px"
            cursor="pointer"
            height="15px"
            borderRadius="full"
            bg={p.colorName}
            border={
              cartProduct.photo.colorName === p.colorName ? "2px" : "none"
            }
            borderColor="gray.700"
            mr={1.5}
          ></Box>
        ))}
      </HStack>
    </Box>
  );
};

export default ProductColors;
