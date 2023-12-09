"use client";

import { Box, Heading, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";

interface adminProps {
  users: User[];
  orders: Order[];
  products: Product[];
}

type Analysis = {
  [key: string]: {
    textLabel: string;
    digit: number;
  };
};

const AdminPage: React.FC<adminProps> = ({ users, orders, products }) => {
  const [statistics, setStatistics] = useState<Analysis>({
    products: {
      textLabel: "Total Products",
      digit: 0,
    },
    sales: {
      textLabel: "Total Sales",
      digit: 0,
    },
    orders: {
      textLabel: "Total Orders",
      digit: 0,
    },
    users: {
      textLabel: "Total Users",
      digit: 0,
    },
    paidOrders: {
      textLabel: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      textLabel: "Unpaid Orders",
      digit: 0,
    },
  });

  useEffect(() => {
    setStatistics((prev) => {
      let data = { ...prev };

      const salesOrders = orders.reduce((acc: number, items: Order) => {
        if (items.status === "complete") {
          return acc + items.amount;
        } else return acc;
      }, 0);

      const paidorders = orders.filter((o: { status: string }) => {
        return o.status === "complete";
      });

      const unpaidorders = orders.filter((o: { status: string }) => {
        return o.status === "pending";
      });

      data.sales.digit = salesOrders;
      data.orders.digit = orders.length;
      data.paidOrders.digit = paidorders.length;
      data.unpaidOrders.digit = unpaidorders.length;
      data.products.digit = products.length;
      data.users.digit = users.length;

      return data;
    });
  }, [users, orders, products]);

  const stats = Object.keys(statistics);

  console.log("Statistics", stats);
  return (
    <Box width="100%">
      <SimpleGrid
        columns={{ base: 2, md: 3 }}
        spacing={10}
        p={{ base: "6", md: "10", lg: "20" }}
      >
        {stats &&
          stats.map((key) => (
            <Flex
              direction="column"
              bg="purple"
              color="white"
              height="90px"
              key={key}
              fontFamily="monospace"
              alignItems="center"
              justifyContent="center"
              borderRadius="xl"
            >
              <Heading
                size={{ base: "xs", md: "md" }}
                mb={2}
                fontFamily="monospace"
              >
                {statistics[key].textLabel}
              </Heading>
              <Text fontSize="md">
                {statistics[key].textLabel === "Total Sales"
                  ? "$" + statistics[key].digit
                  : statistics[key].digit}
              </Text>
            </Flex>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default AdminPage;
