"use client";

import { IoCartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import { Box } from "@chakra-ui/react";

const CartTotalItems = () => {
  const { cartQuantity } = useCart();
  const router = useRouter();

  return (
    <Box position="relative" mr="25px">
      <Box
        mt="-10px"
        mr="-6px"
        position="absolute"
        height="16px"
        width="16px"
        borderRadius="full"
        bg="purple"
        color="white"
        right={0}
        top={0}
        fontSize="10px"
        textAlign="center"
      >
        {cartQuantity}
      </Box>
      <IoCartOutline
        color="gray.600"
        onClick={() => router.push("/cart")}
        cursor="pointer"
      />
    </Box>
  );
};

export default CartTotalItems;
