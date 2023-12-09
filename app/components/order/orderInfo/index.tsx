"use client";
import { orderTitles } from "@/app/utils/title";
import { Box, Flex, Text, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import OrderProductData from "../orderProduct";

interface OrderDetailsData {
  orderDetails: Order;
}

const OrderInfo: React.FC<OrderDetailsData> = ({ orderDetails }) => {
  // const router = useRouter();

  return (
    <Box py={12}>
      <Flex
        fontFamily="monospace"
        direction="column"
        width={{ base: "320px", md: "500px", xl: "550px" }}
        alignItems="center"
        justifyContent="center"
        borderRadius="xl"
        bg="purple"
        color="white"
        mx="auto"
        py={6}
        mb={6}
      >
        <Text mb={1}>Order Id: #{orderDetails.id}</Text>
        <Text mb={1}>Client Name: {orderDetails.userId}</Text>
        <Text mb={1}>Total Bill: ${orderDetails.amount}</Text>
        <Text mb={1}>
          Payment: {orderDetails.status === "pending" ? "Pending" : "Done"}
        </Text>
        <Text mb={1}>Date: {moment(orderDetails.createDate).fromNow()}</Text>
        <Text mb={1}>
          Delivery:{" "}
          {orderDetails.deliveryStatus === "pending"
            ? "Pending"
            : orderDetails.deliveryStatus === "dispatched"
            ? "In 2-3 days"
            : "Done"}
        </Text>
      </Flex>

      <Box width={{ base: "90%", md: "80%", lg: "65%" }} py={12} mx="auto">
        <Grid
          width="100%"
          templateColumns="repeat(5, 1fr)"
          gap={4}
          bg="black"
          color="white"
          py={3}
          borderTopLeftRadius="lg"
          borderTopRightRadius="lg"
          display={{ base: "none", md: "grid" }}
        >
          {orderTitles.map((c: any) => (
            <GridItem
              textAlign="center"
              key={c.id}
              colSpan={c.column}
              textTransform="uppercase"
              fontSize="13.5px"
            >
              {c.id}
            </GridItem>
          ))}
        </Grid>

        <SimpleGrid width="100%" columns={1} textAlign="center" py={4}>
          {orderDetails.products &&
            orderDetails.products.map((c: any) => (
              <OrderProductData key={c.id} data={c} />
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default OrderInfo;
