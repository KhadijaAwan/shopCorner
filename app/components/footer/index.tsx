"use client";
import NextLink from "next/link";
import {
  catalogue,
  details,
  moreItems,
  locationItems,
} from "../../utils/index";
import {
  Flex,
  Box,
  Text,
  Heading,
  HStack,
  Stack,
  Link,
  Center,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      width="100%"
      bg="gray.800"
      minHeight="380px"
      px={{ base: "4", md: "20" }}
      pt={{ base: "10", md: "20" }}
      pb={10}
      fontFamily="monospace"
    >
      <Flex alignItems="center" width="100%" justifyContent="center">
        <Flex
          direction={{ base: "column", lg: "row" }}
          width="90%"
          ml={{ base: "0", md: "16%", lg: "6%", xl: "10%" }}
          mb={{ base: "4", lg: "10" }}
          mx="auto"
          alignItems="center"
          justifyContent="center"
          justifyItems="center"
        >
          <Flex
            direction="column"
            width="100%"
            justifyContent="center"
            mb={{ base: "10", lg: "0" }}
          >
            <HStack>
              <Stack width="100%">
                <Heading
                  mb={3}
                  size="md"
                  color="gray.50"
                  fontFamily="monospace"
                >
                  Catalogue
                </Heading>
                {catalogue.map((c: any) => (
                  <Box key={c.id} my={1} fontSize="xs" color="gray.200">
                    <Text>{c.title}</Text>
                  </Box>
                ))}
              </Stack>

              <Stack width="100%">
                <Heading
                  mb={3}
                  size="md"
                  color="gray.50"
                  fontFamily="monospace"
                >
                  Details
                </Heading>
                {details.map((d: any) => (
                  <Box key={d.id} my={1} fontSize="xs" color="gray.200">
                    <Link
                      as={NextLink}
                      href={d.link}
                      _hover={{ textTransform: "none" }}
                    >
                      {d.title}
                    </Link>
                  </Box>
                ))}
              </Stack>
            </HStack>
          </Flex>

          <Flex direction="column" width="100%">
            <HStack>
              <Stack width="100%">
                <Heading
                  mb={3}
                  size="md"
                  color="gray.50"
                  fontFamily="monospace"
                >
                  {" "}
                  Info
                </Heading>
                {moreItems.map((m: any) => (
                  <Box
                    key={m.id}
                    my={1}
                    fontSize="xs"
                    color="gray.200"
                    _hover={{ fontSize: "12px", color: "gray.100" }}
                  >
                    <Link
                      as={NextLink}
                      href={m.link}
                      _hover={{ textTransform: "none" }}
                    >
                      {m.title}
                    </Link>
                  </Box>
                ))}
              </Stack>

              <Stack width="100%">
                <Heading
                  mb={3}
                  size="md"
                  color="gray.50"
                  fontFamily="monospace"
                >
                  {" "}
                  Location
                </Heading>
                {locationItems.map((l: any) => (
                  <Box key={l.id} my={1} fontSize="xs" color="gray.200">
                    <Text>{l.title}</Text>
                  </Box>
                ))}
              </Stack>
            </HStack>
          </Flex>
        </Flex>
      </Flex>

      <Flex alignItems="center" direction="column">
        <Box
          height="1px"
          width={{ base: "96%", lg: "90%" }}
          bg="gray.500"
          my={6}
        ></Box>

        <Text textAlign="center" mt={2} color="gray.50" fontSize="13.5px">
          Copyright © 2023 Shopping Center Pvt Ltd. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
