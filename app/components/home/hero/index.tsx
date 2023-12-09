"use client";
import backImage from "../../../../public/background.jpg";
import { Box, Stack, Text, Heading, Button } from "@chakra-ui/react";

const Hero = () => {
  const backgroundImageUrl = `url(${backImage.src})`;
  return (
    <Box
      width="100%"
      backgroundImage={backgroundImageUrl}
      backgroundSize={{ md: "100% 100%", lg: "cover" }}
      height={{ base: "49vh", md: "500px", xl: "89vh" }}
    >
      <Stack
        height="500px"
        color="white"
        width={{ base: "85%", md: "80%", lg: "60%" }}
        pt={{ base: "10", md: "20", xl: "32" }}
        pl={{ base: "16", md: "20", xl: "32" }}
        pb={{ base: "10", md: "0" }}
        pr={{ base: "0", md: "0" }}
      >
        <Text>T-Shirt / Tops</Text>
        <Heading size="2xl" mt={3} lineHeight={1.3}>
          Summer <br /> Value Pack
        </Heading>
        <Text my={6}>cool / colorful / comfy</Text>
        <Button width="250px" fontWeight="600">
          Shop Now
        </Button>
      </Stack>
    </Box>
  );
};

export default Hero;
