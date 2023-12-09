import { Box, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { getUser } from "@/actions/getLoginUser";
import SearchItems from "./headerComponents/searchItems";
import CartTotalItems from "./headerComponents/cartTotalItems";
import LoginHeader from "./headerComponents/loginUserHeader";
import Image from "next/image";
import { logo } from "@/public/index";
import ColorSelect from "./colorSelect";

const Header = async () => {
  const authUser = await getUser();
  console.log("User is ", authUser);

  return (
    <Flex
      width="100%"
      position="fixed"
      zIndex={5}
      bg="gray.50"
      height="70px"
      direction="row"
      px={{ base: "6", md: "10" }}
      py={6}
      justifyContent="space-between"
      alignItems="center"
    >
      <Link as={NextLink} href="/">
        <Image src={logo} width={60} alt="Logo" />
      </Link>

      <Box display={{ base: "none", md: "block" }}>
        <SearchItems />
      </Box>

      <Flex justifyContent="end" alignItems="center">
        <CartTotalItems />
        <LoginHeader userData={authUser} />
      </Flex>
    </Flex>
  );
};

export default Header;
