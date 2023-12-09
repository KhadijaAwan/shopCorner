"use client";

import NextLink from "next/link";
import { Flex, Link } from "@chakra-ui/react";
import AdminData from "./adminNavbar";
import {
  MdAddBox,
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
} from "react-icons/md";
import { usePathname } from "next/navigation";

const AdminLinks = () => {
  const pathname = usePathname();

  return (
    <Flex
      width="100%"
      px={{ base: "8", md: "20", lg: "40" }}
      justifyContent="space-between"
      py={4}
      bg="purple.50"
    >
      <Link as={NextLink} href="/admin" _hover={{ textTransform: "none" }}>
        <AdminData
          textLabel="Analysis"
          navIcon={MdDashboard}
          selected={pathname === "/admin"}
        />
      </Link>
      <Link
        as={NextLink}
        href="/admin/addProduct"
        _hover={{ textTransform: "none" }}
      >
        <AdminData
          textLabel="Add New Product"
          navIcon={MdAddBox}
          selected={pathname === "/admin/addProduct"}
        />
      </Link>
      <Link
        as={NextLink}
        href="/admin/manageProducts"
        _hover={{ textTransform: "none" }}
      >
        <AdminData
          textLabel="Manage Products"
          navIcon={MdDns}
          selected={pathname === "/admin/manageProducts"}
        />
      </Link>
      <Link
        as={NextLink}
        href="/admin/manageOrders"
        _hover={{ textTransform: "none" }}
      >
        <AdminData
          textLabel="Manage Orders"
          navIcon={MdFormatListBulleted}
          selected={pathname === "/admin/manageOrders"}
        />
      </Link>
    </Flex>
  );
};

export default AdminLinks;
