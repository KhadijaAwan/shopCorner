"use client";
import { Order, User } from "@prisma/client";
import HeadingType from "../../../headingType";
import IconArrange from "../../manageProduct/iconArrange";
import { useRouter } from "next/navigation";
import moment from "moment";
import {
  Text,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";

type ExtendedOrder = Order & {
  user: User;
};

interface userOrderProps {
  orders: ExtendedOrder[];
}

const UserOrdersContent: React.FC<userOrderProps> = ({ orders }) => {
  const router = useRouter();

  return (
    <Box py={10}>
      <HeadingType
        headingText={"Your Orders"}
        headingSize={"xl"}
        headingAlign={true}
      />

      <SimpleGrid
        columns={1}
        spacing="10"
        display={{ base: "block", md: "none" }}
        mt={10}
      >
        {orders.map((o) => (
          <Flex
            onClick={() => router.push(`/order/${o.id}`)}
            direction="column"
            width="320px"
            mx="auto"
            p={5}
            borderRadius="lg"
            bg="black"
            mb="20px"
            key={o.id}
          >
            <HStack fontSize="13px" mb={2}>
              <Text color="pink.100" mr={3}>
                OrderId
              </Text>
              <Text color="gray.200">{o.id}</Text>
            </HStack>

            <HStack fontSize="13px" mb={2}>
              <Text color="pink.100" mr={6}>
                Client
              </Text>
              <Text color="gray.200">{o.user.name}</Text>
            </HStack>

            <HStack fontSize="13px" mb={2}>
              <Text color="pink.100" mr={3}>
                Amount
              </Text>
              <Text color="gray.200">{o.amount}</Text>
            </HStack>

            <HStack fontSize="13px" mb={2}>
              <Text color="pink.100" mr={2}>
                Payment
              </Text>
              <Text color="gray.200">
                {o.status === "pending" ? "Pending" : "Completed"}
              </Text>
            </HStack>

            <HStack fontSize="13px" mb={2}>
              <Text color="pink.100" mr={9}>
                Date
              </Text>
              <Text color="gray.200">{moment(o.createDate).fromNow()}</Text>
            </HStack>

            <HStack fontSize="13px" mb={2}>
              <Text color="pink.100" mr={4}>
                Delivery
              </Text>
              <Text color="gray.200">
                {o.deliveryStatus === "pending"
                  ? "No"
                  : o.deliveryStatus === "dispatched"
                  ? "Dispatch"
                  : "Yes"}
              </Text>
            </HStack>
          </Flex>
        ))}
      </SimpleGrid>

      <Box
        display={{ base: "none", md: "block" }}
        width={{ md: "735px", lg: "1000px" }}
        mx="auto"
        mt={10}
        bg="black"
        color="white"
        overflowX="auto"
        borderRadius="lg"
      >
        <Table>
          <Thead>
            <Tr bg="purple">
              <Th color="white">Id</Th>
              <Th color="white">Client</Th>
              <Th color="white">Amount</Th>
              <Th color="white">Payment</Th>
              <Th color="white">Delivery</Th>
              <Th color="white">Date</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={{ base: "10px", md: "11px", lg: "12px" }}>
            {orders.map((o) => (
              <Tr key={o.id} onClick={() => router.push(`/order/${o.id}`)}>
                <Td>{o.id.length > 15 ? o.id.substr(0, 10) : o.id}</Td>
                <Td>{o.user.name}</Td>
                <Td>{o.amount}</Td>
                <Td textAlign={"center"}>
                  {o.status === "pending" ? (
                    <IconArrange
                      label={"Pending"}
                      background={"red.500"}
                      color={"white"}
                    />
                  ) : o.status === "complete" ? (
                    <IconArrange
                      label={"Done"}
                      background={"green.600"}
                      color={"white"}
                    />
                  ) : null}
                </Td>
                <Td textAlign={"center"}>
                  {o.deliveryStatus === "pending" ? (
                    <IconArrange
                      label={"No"}
                      background={"red"}
                      color={"white"}
                    />
                  ) : o.deliveryStatus === "dispatched" ? (
                    <IconArrange
                      label={"Dispatch"}
                      background={"purple"}
                      color={"white"}
                    />
                  ) : (
                    <IconArrange
                      label={"Yes"}
                      background={"green"}
                      color={"white"}
                    />
                  )}
                </Td>
                <Td>{moment(o.createDate).fromNow()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default UserOrdersContent;
