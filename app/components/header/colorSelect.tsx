"use client";
import { StarIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const ColorSelect = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Star Icon Button"
      icon={<StarIcon color={colorMode === "light" ? "black" : "white"} />}
      onClick={toggleColorMode}
    />
  );
};

export default ColorSelect;
