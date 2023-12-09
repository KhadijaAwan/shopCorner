import { Box, Flex } from "@chakra-ui/react";
import SearchItems from "../headerComponents/searchItems";

const SearchBar = () => {
  return (
    <Flex
      width="100%"
      bg="gray.50"
      height="70px"
      py={6}
      justifyContent="center"
      alignItems="center"
      display={{ base: "flex", md: "none" }}
    >
      <Box display={{ base: "block", md: "none" }}>
        <SearchItems />
      </Box>
    </Flex>
  );
};

export default SearchBar;
