"use client";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";

interface getLoginInfo {
  userData: any;
}

const LoginHeader: React.FC<getLoginInfo> = ({ userData }) => {
  const router = useRouter();

  const { cartProducts, resetCart } = useCart();

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <Avatar size="xs" mr="10px" src={userData?.image} />
      </MenuButton>
      <MenuList fontSize="13px" minWidth="200px" px={16} mt="5px">
        {userData ? (
          userData.role === "ADMIN" ? (
            <>
              <MenuItem
                color="gray.800"
                _hover={{ color: "purple", bg: "inherit" }}
              >
                <Link
                  as={NextLink}
                  href="/admin"
                  color="gray.800"
                  _hover={{ color: "purple", bg: "white" }}
                >
                  Admin
                </Link>
              </MenuItem>
              <MenuItem
                color="gray.800"
                _hover={{ color: "purple", bg: "inherit" }}
              >
                <Link
                  as={NextLink}
                  href="/orders"
                  color="gray.800"
                  _hover={{ color: "purple", bg: "inherit" }}
                >
                  Orders
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  signOut();
                  resetCart();
                  router.push("/");
                }}
                color="gray.800"
                _hover={{ color: "purple", bg: "inherit" }}
              >
                Log out
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                color="gray.800"
                _hover={{ color: "purple", bg: "inherit" }}
              >
                <Link
                  as={NextLink}
                  href="/orders"
                  color="gray.800"
                  _hover={{ color: "purple", bg: "white" }}
                >
                  Orders
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
                color="gray.800"
                _hover={{ color: "purple", bg: "inherit" }}
              >
                Log out
              </MenuItem>
            </>
          )
        ) : (
          <>
            <MenuItem
              color="gray.800"
              _hover={{ color: "purple", bg: "inherit" }}
            >
              <Link
                as={NextLink}
                href="/login"
                color="gray.800"
                _hover={{ color: "purple", bg: "white" }}
              >
                Login
              </Link>
            </MenuItem>
            <MenuItem
              color="gray.800"
              _hover={{ color: "purple", bg: "inherit" }}
            >
              <Link
                as={NextLink}
                href="/registerData"
                color="gray.800"
                _hover={{ color: "purple", bg: "white" }}
              >
                Register
              </Link>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default LoginHeader;
