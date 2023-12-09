"use client";

import { useCart } from "@/context/cartContext";
import {
  Box,
  Text,
  Flex,
  Center,
  SimpleGrid,
  Grid,
  GridItem,
  Stack,
  HStack,
} from "@chakra-ui/react";
import GetButton from "../../getButton";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { cartTitles } from "../../../utils/title";
import CartProductData from "../cartProductData";

interface cartProps {
  authUser: any;
}

const CartContent: React.FC<cartProps> = ({ authUser }) => {
  const { cartProducts, resetCart, cartAmount } = useCart();
  const router = useRouter();

  return (
    <Box width="100%">
      {!cartProducts || cartProducts.length === 0 ? (
        <Flex width="100%" py={16} direction="column">
          <Text
            mb={6}
            color="gray.600"
            fontFamily="monospace"
            textAlign="center"
            fontSize="md"
          >
            Your Cart is Empty
          </Text>
          <Center>
            <GetButton
              buttonName="Shop Now"
              buttonWidth="200px"
              buttonClick={() => router.push("/")}
              bgColor="Purple"
              textColor="white"
              hoverBgColor="purple.700"
              hoverTextColor="white"
            />
          </Center>
        </Flex>
      ) : (
        <Box width="100%" px={{ base: "10", lg: "20" }} py={12}>
          <Flex width="100%" direction="column" mb={8}>
            <HStack mb={4} fontFamily="monospace">
              <Text
                color="gray.800"
                fontSize="15px"
                cursor="pointer"
                onClick={() => router.push("/")}
              >
                Home
              </Text>{" "}
              <ArrowRightIcon mx={4} />
              <Text color="gray.800" fontSize="15px">
                Add to Cart
              </Text>
            </HStack>
            <Text color="gray.600" fontSize="12px">
              Please click checkout option to complete your purchase!
            </Text>
          </Flex>

          <Grid
            width="100%"
            templateColumns="repeat(6, 1fr)"
            gap={4}
            bg="black"
            color="white"
            py={3}
            borderTopLeftRadius="lg"
            borderTopRightRadius="lg"
            display={{ base: "none", md: "grid" }}
          >
            {cartTitles.map((c: any) => (
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
            {cartProducts &&
              cartProducts.map((c: any) => (
                <CartProductData key={c.id} data={c} />
              ))}
          </SimpleGrid>

          <Flex direction={{ base: "column", md: "row" }} width="100%">
            <Box width="100%">
              <GetButton
                buttonName="Reset Cart"
                buttonWidth="180px"
                buttonClick={() => resetCart()}
                bgColor="Purple"
                textColor="white"
                hoverBgColor="purple.700"
                hoverTextColor="white"
              />
            </Box>

            <Flex width="100%" direction="column" mt={{base:"10", md:"0"}}>
              <Flex
                mt={2}
                mb={6}
                borderRadius="lg"
                bg="gray.100"
                py={4}
                px={10}
                width="280px"
                justifyContent="space-between"
              >
                <Text>Sub Total</Text>
                <Text>${cartAmount}</Text>
              </Flex>
              <GetButton
                buttonName={
                  authUser ? "Proceed to Checkout" : "Login to Continue"
                }
                buttonWidth="280px"
                buttonClick={() =>
                  router.push(authUser ? "/checkout" : "/login")
                }
                bgColor="Black"
                textColor="white"
                hoverBgColor="gray.800"
                hoverTextColor="white"
              />
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default CartContent;
