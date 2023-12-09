"use client";

import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, CheckCircleIcon } from "@chakra-ui/icons";
import ProductColors from "../productColor";
import ProductQuantity from "../productQuantity";
import GetButton from "../../getButton";
import ProductImage from "../productImage";
import Listing from "../Listing";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import Rating from "../rating";

interface ProductDetailsData {
  productDetails: any;
  user: any;
}

export type ChooseColorImage = {
  colorName: string;
  colorCode: string;
  choosenImg: string;
};

export type ProductCart = {
  id: string;
  name: string;
  description: string;
  price: number;
  photo: ChooseColorImage;
  brand: string;
  category: string;
  quantity: number;
};

const ProductInfo: React.FC<ProductDetailsData> = ({
  productDetails,
  user,
}) => {
  const router = useRouter();

  const [cartData, setCartData] = useState<ProductCart>({
    id: productDetails.id,
    name: productDetails.name,
    description: productDetails.description,
    price: productDetails.price,
    photo: { ...productDetails.photo[0] },
    brand: productDetails.brand,
    category: productDetails.category,
    quantity: 1,
  });

  const [addedProduct, setAddedProduct] = useState(false);

  console.log("product Details:", cartData);

  const { cartProducts, handleAddtoCart } = useCart();
  console.log("Cart Products:", cartProducts);

  const handleSelectColor = useCallback(
    (value: ChooseColorImage) => {
      setCartData((prev) => {
        return { ...prev, photo: value };
      });
    },
    [cartData.photo]
  );

  const productIncrease = useCallback(() => {
    if (cartData.quantity === 50) return;

    setCartData((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartData]);

  const productDecrease = useCallback(() => {
    if (cartData.quantity === 1) return;

    setCartData((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartData]);

  useEffect(() => {
    setAddedProduct(false);

    if (cartProducts) {
      const alreadyPresentProduct = cartProducts.findIndex(
        (item) => item.id === productDetails.id
      );
      if (alreadyPresentProduct > -1) {
        setAddedProduct(true);
      }
    }
  }, [cartProducts]);

  return (
    <Flex width="100%" direction={{ base: "column", md: "row" }}>
      <Box
        width="100%"
        px={{ base: "3", lg: "10" }}
        pt={10}
        pb={{ base: "0", lg: "10" }}
      >
        <ProductImage
          cartProduct={cartData}
          productData={productDetails}
          chooseProduct={handleSelectColor}
        />
      </Box>

      <Flex width="100%" direction="column" p={10}>
        <HStack mb={4} fontFamily="monospace">
          <Text
            color="gray.800"
            fontSize="15px"
            cursor="pointer"
            onClick={() => router.push("/")}
          >
            Shop
          </Text>{" "}
          <ArrowRightIcon mx={4} />
          <Text color="gray.800" fontSize="15px">
            {productDetails.category}
          </Text>
          <ArrowRightIcon mx={4} />
        </HStack>

        <Text mt={1} mb={2} fontSize="36px" fontWeight="semibold">
          {productDetails.name}
        </Text>
        <Rating defaultRating={4} />

        <Text fontSize="13px" textAlign="justify" color="gray.600" my={2}>
          {productDetails.description}
        </Text>

        <HStack my={2} color="gray.700">
          <Text fontSize="15px" fontWeight="bold" fontFamily="monospace">
            Category:{" "}
          </Text>
          <Text fontSize="13px">{productDetails.category}</Text>
        </HStack>

        <HStack mb={2} color="gray.700">
          <Text fontSize="15px" fontWeight="bold" fontFamily="monospace">
            Brand:{" "}
          </Text>
          <Text fontSize="13px">{productDetails.brand}</Text>
        </HStack>

        {addedProduct ? (
          <Box my={3}>
            <Text fontSize="14px" color="gray.600" mb={3.5}>
              <CheckCircleIcon mr={2} />
              Product Added in Cart
            </Text>
            <GetButton
              buttonName="View Cart"
              buttonWidth="280px"
              buttonClick={() => router.push("/cart")}
              bgColor="Black"
              textColor="white"
              hoverBgColor="gray.800"
              hoverTextColor="white"
            />
          </Box>
        ) : (
          <>
            <ProductColors
              cartProduct={cartData}
              pictures={productDetails.photo}
              selectColor={handleSelectColor}
            />

            <ProductQuantity
              label={true}
              color="gray.900"
              cartproduct={cartData}
              productIncrease={productIncrease}
              productDecrease={productDecrease}
            />

            <Flex
              width="300px"
              justifyContent="space-between"
              alignItems="center"
              my={4}
            >
              <GetButton
                buttonName="Add to Cart"
                buttonWidth="200px"
                buttonClick={() => handleAddtoCart(cartData)}
                bgColor="Black"
                textColor="white"
                hoverBgColor="gray.800"
                hoverTextColor="white"
              />
              <Box width="70px" fontWeight="medium">
                ${productDetails.price}
              </Box>
            </Flex>

            <Text
              my={2}
              fontSize="md"
              fontWeight="semibold"
              color="gray.800"
              fontFamily="monospace"
            >
              {productDetails.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default ProductInfo;
