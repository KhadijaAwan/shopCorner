"use client";

import Image from "next/image";
import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  SimpleGrid,
  Text,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { titleTransform } from "../../../utils/title";
import { useRouter } from "next/navigation";
import Rating from "../../product/rating";

interface ProductData {
  data: any;
}

const AllProducts: React.FC<ProductData> = ({ data }) => {
  const router = useRouter();

  return (
    <Card
      bg="gray.50"
      p={2}
      key={data.id}
      textAlign="center"
      onClick={() => router.push(`/product/${data.id}`)}
      cursor="pointer"
      _hover={{ bg: "gray.100", transform: "scale(1.05)" }}
      fontFamily="monospace"
      transition="transform 0.3s ease-in-out"
      fontWeight="bold"
    >
      <Flex justifyContent={"center"}>
        <Image
          src={data.photo[0].choosenImg}
          alt="product-image"
          width={250}
          height={250}
          style={{ borderRadius: "10px" }}
        />
      </Flex>
      <Text mt={4} fontSize="lg">
        {titleTransform(data.name)}
      </Text>
      
      <Flex justifyContent={"center"}>
      <Rating defaultRating={4} />
      </Flex>
      
      <Text fontSize="md" my={1} color="gray.800">
        ${data.price}
      </Text>
      <Text color={data.inStock ? "purple" : "red"} my="5px">
        {data.inStock ? "In Stock" : "Out of Stock"}
      </Text>
    </Card>
  );
};

export default AllProducts;
