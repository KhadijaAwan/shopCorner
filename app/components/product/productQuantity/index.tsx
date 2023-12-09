"use client";

import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { ProductCart } from "../productInfo";

interface SetQuantity {
  label: boolean;
  cartproduct: ProductCart;
  productIncrease: () => void;
  productDecrease: () => void;
  color:string;
}

const ProductQuantity: React.FC<SetQuantity> = ({
  label,
  cartproduct,
  productIncrease,
  productDecrease,
  color,
}) => {
  return (
    <Box width="100%">
      <HStack my={2}>
        {label ? (
          <Text
            mr={4}
            fontSize="15px"
            fontWeight="bold"
            fontFamily="monospace"
            color="gray.700"
          >
            Quantity
          </Text>
        ) : null}
        <Button onClick={productIncrease} mr={1}>
          +
        </Button>
        <Text color={color}>{cartproduct.quantity}</Text>
        <Button onClick={productDecrease} ml={1}>
          -
        </Button>
      </HStack>
    </Box>
  );
};

export default ProductQuantity;
