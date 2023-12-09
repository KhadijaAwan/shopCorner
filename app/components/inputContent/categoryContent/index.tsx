"use client";
import { Flex, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface CategoriesProps {
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
  icon: IconType;
}

const CategoriesContent: React.FC<CategoriesProps> = ({
  label,
  selected,
  onClick,
  icon: Icon,
}) => {
  return (
    <Flex direction={"column"} onClick={() => onClick(label)}>
      <Icon size={30} color={selected ? "purple" : "gray.800"} />
      <Text
        fontSize={{ base: "12.5px", md: "14px" }}
        fontFamily="monospace"
        color={selected ? "purple" : "gray.800"}
      >
        {label}
      </Text>
    </Flex>
  );
};

export default CategoriesContent;
