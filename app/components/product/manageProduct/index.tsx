"use client";
import { Product } from "@prisma/client";
import HeadingType from "../../headingType";
import IconArrange from "./iconArrange";
import { MdCached, MdDelete, MdRemoveRedEye } from "react-icons/md";
import ActionIcons from "./ActionIcons";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ref, getStorage, deleteObject } from "firebase/storage";
import firebaseApp from "@/helper/firebase";
import {
  Text,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";

interface manageProductProps {
  products: Product[];
}

const ManageProductsContent: React.FC<manageProductProps> = ({ products }) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);

  const handleActions = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((response) => {
        toast.success("Product Status Updated");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Product Status Updation Failed");
        console.log("Error in Product Status Updation ", error);
      });
  }, []);

  const handleRemove = useCallback(async (id: string, photo: any[]) => {
    toast.success("Product is Deleting");

    const handleRemovePhoto = async () => {
      try {
        for (const i of photo) {
          if (i.choosenImg) {
            const imageRef = ref(storage, i.choosenImg);
            await deleteObject(imageRef);
            console.log("Photo Deleted", i.choosenImg);
          }
        }
      } catch (error) {
        console.log("Error in Product Image Removal ", error);
      }
    };

    await handleRemovePhoto();

    axios
      .delete(`/api/product/${id}`)
      .then((response) => {
        toast.success("Product Deleted Successfully");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Product Deletion Failed");
        console.log("Error in Product Deletion", error);
      });
  }, []);

  return (
    <Box py={10}>
      <HeadingType
        headingText={"Manage Products"}
        headingSize={"xl"}
        headingAlign={true}
      />

      <SimpleGrid
        columns={1}
        spacing="10"
        display={{ base: "block", md: "none" }}
        mt={10}
      >
        {products.map((p) => (
          <Flex
            direction="column"
            width="320px"
            mx="auto"
            p={5}
            borderRadius="lg"
            bg="black"
            mb="20px"
            key={p.id}
          >
            <HStack fontSize="13px" mb={2}>
              <Text color="pink.100" mr={3}>
                ProductId
              </Text>
              <Text color="gray.200">{p.id}</Text>
            </HStack>

            <HStack fontSize="13px" mb={2}>
              <Text color="pink.100" mr={9}>
                Name
              </Text>
              <Text color="gray.200">{p.name}</Text>
            </HStack>

            <HStack fontSize="13px" mb={2}>
              <Text color="pink.100" mr={12}>
                Price
              </Text>
              <Text color="gray.200">${p.price}</Text>
            </HStack>

            <HStack fontSize="13px" mb={2}>
              <Text color="pink.100" mr={4}>
                Category
              </Text>
              <Text color="gray.200">{p.category}</Text>
            </HStack>

            <HStack fontSize="13px" mb={2}>
              <Text color="pink.100" mr={10}>
                Brand
              </Text>
              <Text color="gray.200">{p.brand}</Text>
            </HStack>

            <HStack fontSize="13px" mb={1}>
              <Text color="pink.100" mr={8}>
                InStock
              </Text>
              <Text color="gray.200">{p.inStock === true ? "Yes" : "No"}</Text>
            </HStack>

            <HStack>
              <Text color="pink.100" mr={4} fontSize="13px">
                Actions
              </Text>
              <Flex justifyContent="space-between">
                <IconButton
                  onClick={() => {
                    handleActions(p.id, p.inStock);
                  }}
                  icon={<MdCached />}
                  color="orange"
                  aria-label={""}
                  bg="inherit"
                  _hover={{ bg: "gray.800" }}
                />
                <IconButton
                  onClick={() => {
                    handleRemove(p.id, p.photo);
                  }}
                  icon={<MdDelete />}
                  color="red"
                  aria-label={""}
                  bg="inherit"
                  _hover={{ bg: "gray.800" }}
                />
                <IconButton
                  onClick={() => router.push(`/product/${p.id}`)}
                  icon={<MdRemoveRedEye />}
                  color="blue"
                  bg="inherit"
                  _hover={{ bg: "gray.800" }}
                  aria-label={""}
                />
              </Flex>
            </HStack>
          </Flex>
        ))}
      </SimpleGrid>

      <Box
        display={{ base: "none", md: "block" }}
        width={{ md: "720px", lg: "1000px" }}
        mx="auto"
        mt={10}
        bg="black"
        color="white"
        overflowX="auto"
        borderRadius="lg"
      >
        <Table>
          <Thead>
            <Tr bg="purple">
              <Th color="white">ProductId</Th>
              <Th color="white">Name</Th>
              <Th color="white">Price</Th>
              <Th color="white">Category</Th>
              <Th color="white">Brand</Th>
              <Th color="white">InStock</Th>
              <Th color="white">Actions</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={{ base: "10px", md: "11px", lg: "12px" }}>
            {products.map((p) => (
              <Tr key={p.id}>
                <Td>{p.id.length > 15 ? p.id.substr(0, 13) : p.id}</Td>
                <Td>{p.name}</Td>
                <Td>{p.price}</Td>
                <Td>{p.category}</Td>
                <Td>{p.brand}</Td>
                <Td>
                  {p.inStock === true ? (
                    <IconArrange
                      label={"Yes"}
                      background={"green.500"}
                      color={"white"}
                    />
                  ) : (
                    <IconArrange
                      label={"No"}
                      background={"red.500"}
                      color={"white"}
                    />
                  )}
                </Td>
                <Td>
                  <Flex
                    justifyContent={{ base: "center", lg: "space-between" }}
                    direction={{ base: "column", lg: "row" }}
                  >
                    <IconButton
                      onClick={() => {
                        handleActions(p.id, p.inStock);
                      }}
                      icon={<MdCached />}
                      color="orange"
                      aria-label={""}
                      bg="inherit"
                      _hover={{ bg: "gray.800" }}
                    />
                    <IconButton
                      onClick={() => {
                        handleRemove(p.id, p.photo);
                      }}
                      icon={<MdDelete />}
                      color="green"
                      aria-label={""}
                      bg="inherit"
                      _hover={{ bg: "gray.800" }}
                    />
                    <IconButton
                      onClick={() => router.push(`/product/${p.id}`)}
                      icon={<MdRemoveRedEye />}
                      color="blue"
                      bg="inherit"
                      _hover={{ bg: "gray.800" }}
                      aria-label={""}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ManageProductsContent;
