"use client";
import { StarIcon } from "@chakra-ui/icons";
import { Flex, Icon, IconButton } from "@chakra-ui/react";

const Rating = ({ defaultRating }: { defaultRating: any }) => {
  return (
    <Flex p={0}>
      {[...Array(5)].map((_, index) => (
        <IconButton
          ml="-18px"
          bg="inherit"
          key={index}
          icon={<Icon as={StarIcon} w={4} h={4} />}
          color={index < defaultRating ? "gold" : "gray.300"}
          aria-label={"Product Rating"}
          _hover={{ bg: "inherit" }}
        />
      ))}
    </Flex>
  );
};

export default Rating;
