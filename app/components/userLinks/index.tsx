"use client";

import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import ProductCategoriesData from "./productCategoriesData";
import { productCategories } from "@/app/utils/title";

const UserLinks = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  return (
    <Flex
      width="100%"
      px={{ base: "4", md: "10", lg: "20", xl: "40" }}
      justifyContent="space-between"
      py={4}
      bg="purple.50"
    >
      {productCategories.map((p) => (
        <ProductCategoriesData
          key={p.id}
          textLabel={p.id}
          navIcon={p.icon}
          selected={category === p.id}
        />
      ))}
    </Flex>
  );
};

export default UserLinks;
