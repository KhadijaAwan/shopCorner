"use client";

import { Avatar, Box, Card, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import HeadingType from "../../headingType";
import moment from "moment";
import Rating from "../rating";

interface ListingProduct {
  productName: any;
}

const Listing: React.FC<ListingProduct> = ({ productName }) => {
  return (
    <Box width="100%" p={6}>
      <HeadingType
        headingText="Product Review"
        headingAlign={false}
        headingSize="md"
      />
      <SimpleGrid columns={1} mt={7}>
        {productName.reviews &&
          productName.reviews.map((p: any) => (
            <Card
              key={p.id}
              width={{ base: "300px", lg: "400px", xl: "450px" }}
              mb={4}
              bg="gray.100"
              py={3}
              px={5}
            >
              <Flex
                my={1}
                justifyContent="space-between"
                alignItems="center"
                px={{ base: "2", md: "10" }}
              >
                <Avatar size="sm" src={p.user.image}></Avatar>
                <Text fontWeight="medium" fontSize="15px">
                  {p.user.name}
                </Text>
                <Text fontSize="13px">{moment(p.createdDate).fromNow()}</Text>
              </Flex>

              <Rating defaultRating={p.rating} />
              <Text mt={2} fontSize="13px">
                {p.comment}
              </Text>
            </Card>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default Listing;
