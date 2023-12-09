export const revalidate = 0;

import { Box, SimpleGrid } from "@chakra-ui/react";
import Hero from "./components/home/hero";
import AllProducts from "./components/home/products";
import getProducts, { productParams } from "@/actions/getProducts";
import Unauthorized from "./components/home/unauthorized";
import UserLinks from "./components/userLinks";
import SearchBar from "./components/header/searchbar";

interface homeProps {
  searchParams: productParams;
}
export default async function Home({ searchParams }: homeProps) {
  const products = await getProducts(searchParams);

  console.log("Products are ", products);

  return (
    <>
      <SearchBar />
      <UserLinks />
      <Hero />
      <Box width="100%">
        <SimpleGrid
          p={{ base: "10", md: "16", lg: "20" }}
          width="100%"
          columns={{ base: 1, md: 3, xl: 4 }}
          spacing={10}
        >
          {products && products.length > 0 ? (
            products.map((p: any) => <AllProducts key={p.id} data={p} />)
          ) : (
            <Unauthorized label={"No products Found"} />
          )}
        </SimpleGrid>
      </Box>
    </>
  );
}
