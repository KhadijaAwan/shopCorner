"use client";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons/lib";

interface ProductCategoriesProps {
  selected?: boolean;
  textLabel: string;
  navIcon: IconType;
}

const ProductCategoriesData: React.FC<ProductCategoriesProps> = ({
  selected,
  textLabel,
  navIcon: Icon,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let selectCategory = {};
    if (params) {
      selectCategory = queryString.parse(params.toString());
    }

    const updateQuery: any = {
      ...selectCategory,
      category: textLabel,
    };

    const getURL = queryString.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      {
        skipNull: true,
      }
    );

    router.push(getURL);
  }, [params, textLabel, router]);

  return (
    <Flex
      alignItems="center"
      direction={{ base: "column", md: "row" }}
      onClick={handleClick}
      _hover={{ color: "purple", cursor: "pointer" }}
      color={selected ? "purple" : "blue.700"}
    >
      <Icon size={20} />
      <Text
        ml={2}
        fontFamily="monospace"
        fontSize={{ base: "12.5px", md: "sm" }}
      >
        {textLabel}
      </Text>
    </Flex>
  );
};

export default ProductCategoriesData;
