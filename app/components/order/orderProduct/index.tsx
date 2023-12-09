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

interface OrderItem {
  data: ProductCart;
}

const OrderProductData: React.FC<OrderItem> = ({ data }) => {
  return (
    <>
      <Stack
        width="320px"
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
            <Text color="gray.100" mr={6}>
              Quantity
            </Text>
            <Text color="gray.200">{data.quantity}</Text>
          </HStack>

          <HStack fontSize="13px" mb={4}>
            <Text color="gray.100" mr={12}>
              Total
            </Text>
            <Text color="gray.200">${data.price * data.quantity}</Text>
          </HStack>
        </Box>
      </Stack>

      <Grid
        templateColumns="repeat(5, 1fr)"
        gap={4}
        width="100%"
        mb={5}
        alignItems="center"
        display={{ base: "none", md: "grid" }}
      >
        <GridItem
          colSpan={2}
          alignItems="center"
          justifyItems="center"
          fontFamily="monospace"
        >
          <Flex alignItems="center" pl={{ base: "0", md: "10" }}>
            <Image
              src={data.photo.choosenImg}
              alt="product image"
              width={80}
              height={80}
              style={{ borderRadius: "5px" }}
            />
            <Box ml={{ base: "2", md: "5" }}>
              <Text fontSize="13.5px">{data.name}</Text>
              <Text fontSize="10px" my={1}>
                {data.brand}
              </Text>
              <Text fontSize="10px">{data.photo.colorName}</Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={1}
          textAlign="center"
          fontFamily="monospace"
          fontSize="md"
        >
          ${data.price}
        </GridItem>
        <GridItem
          colSpan={1.5}
          textAlign="center"
          fontFamily="monospace"
          fontSize="md"
        >
          <Text>{data.quantity}</Text>
        </GridItem>
        <GridItem
          pr={2}
          colSpan={1}
          textAlign="center"
          fontFamily="monospace"
          fontSize="md"
        >
          ${data.price * data.quantity}
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

export default OrderProductData;
