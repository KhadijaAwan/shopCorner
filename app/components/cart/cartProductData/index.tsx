"use client";

import Image from "next/image";
import {
  Grid,
  GridItem,
  Flex,
  Box,
  Text,
  Center,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { ProductCart } from "../../product/productInfo";
import { DeleteIcon } from "@chakra-ui/icons";
import ProductQuantity from "../../product/productQuantity";
import { useCart } from "@/context/cartContext";

interface CartItem {
  data: ProductCart;
}

const CartProductData: React.FC<CartItem> = ({ data }) => {
  const { handleRemovetoCart, productIncrease, productDecrease } = useCart();

  return (
    <>
      <Stack
        width="300px"
        mx="auto"
        borderRadius="lg"
        bg="gray.800"
        mb="20px"
        pl={1}
        display={{ base: "block", md: "none" }}
      >
        <Box mx="auto" width="280px" py={6}>
          <HStack fontSize="13px" mb={3}>
            <Text color="gray.100" mr={3}>
              Product
            </Text>
            <Flex pl={4}>
              <Image
                src={data.photo.choosenImg}
                alt="product image"
                width={60}
                height={60}
                style={{ borderRadius: "5px" }}
              />
              <Box ml={3} color="gray.100">
                <Text fontSize="12.5px">{data.name}</Text>
                <Text fontSize="10px" my={1}>
                  {data.brand}
                </Text>
                <Text fontSize="10px">{data.photo.colorName}</Text>
              </Box>
            </Flex>
          </HStack>

          <HStack fontSize="13px" mb={2}>
            <Text color="gray.100" mr={12}>
              Price
            </Text>
            <Text color="gray.200">${data.price}</Text>
          </HStack>

          <HStack fontSize="13px" mb={2}>
            <Text color="gray.100" mr={3}>
              Quantity
            </Text>
            <ProductQuantity
              label={false}
              cartproduct={data}
              color="gray.200"
              productIncrease={() => productIncrease(data)}
              productDecrease={() => productDecrease(data)}
            />
          </HStack>

          <HStack fontSize="13px" mb={4}>
            <Text color="gray.100" mr={10}>
              Total
            </Text>
            <Text color="gray.200">${data.price * data.quantity}</Text>
          </HStack>

          <HStack fontSize="13px" mb={2}>
            <Text color="gray.100" mr={10}>
              Remove
            </Text>
            <DeleteIcon
              color="red"
              cursor="pointer"
              onClick={() => handleRemovetoCart(data)}
            />
          </HStack>
        </Box>
      </Stack>

      <Grid
        templateColumns="repeat(6, 1fr)"
        gap={4}
        width="100%"
        mb={5}
        alignItems="center"
        display={{ base: "none", md: "grid" }}
      >
        <GridItem colSpan={2} alignItems="center" justifyItems="center">
          <Flex pl={4}>
            <Image
              src={data.photo.choosenImg}
              alt="product image"
              width={60}
              height={60}
              style={{ borderRadius: "5px" }}
            />
            <Box ml={5}>
              <Text fontSize="13.5px">{data.name}</Text>
              <Text fontSize="10px" my={1}>
                {data.brand}
              </Text>
              <Text fontSize="10px">{data.photo.colorName}</Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={1} textAlign="center">
          ${data.price}
        </GridItem>
        <GridItem colSpan={1.5} mx="auto">
          <ProductQuantity
            label={false}
            cartproduct={data}
            color="gray.900"
            productIncrease={() => productIncrease(data)}
            productDecrease={() => productDecrease(data)}
          />
        </GridItem>
        <GridItem colSpan={1} textAlign="center">
          ${data.price * data.quantity}
        </GridItem>
        <GridItem colSpan={0.5} textAlign="center">
          <DeleteIcon
            color="red"
            cursor="pointer"
            onClick={() => handleRemovetoCart(data)}
          />
        </GridItem>
      </Grid>
      <Box
        width="100%"
        height="1.5px"
        bg="gray.300"
        px={4}
        mb={4}
        display={{ base: "none", md: "block" }}
      ></Box>
    </>
  );
};

export default CartProductData;
