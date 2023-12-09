"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ChooseColorImage, ProductCart } from "../productInfo";
import Image from "next/image";

interface SetProductImage {
  cartProduct: ProductCart;
  productData: any;
  chooseProduct: (value: ChooseColorImage) => void;
}

const ProductImage: React.FC<SetProductImage> = ({
  cartProduct,
  productData,
  chooseProduct,
}) => {
  return (
    <Flex width="100%" p={4}>
      <Flex direction="column" width={100}>
        {productData.photo.map((p: ChooseColorImage) => (
          <Box
            key={p.colorName}
            onClick={() => chooseProduct(p)}
            border={
              cartProduct.photo.colorName === p.colorName ? "2px" : "none"
            }
            borderRadius="5px"
            borderColor={
              cartProduct.photo.colorName === p.colorName ? "gray.700" : "none"
            }
            mb={5}
          >
            <Image
              src={p.choosenImg}
              alt="product image"
              width={100}
              height={100}
              style={{ borderRadius: "5px" }}
            />
          </Box>
        ))}
      </Flex>

      <Box
        width="100%"
        pb={{ md: "7", xl: "10" }}
        pl={{ base: "7", xl: "20" }}
        pr={{ base: "0", xl: "10" }}
      >
        <Image
          src={cartProduct.photo.choosenImg}
          alt="product image"
          width={400}
          height={400}
          style={{ borderRadius: "10px" }}
        />
      </Box>
    </Flex>
  );
};

export default ProductImage;
