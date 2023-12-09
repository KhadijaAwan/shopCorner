"use client";

import { Heading } from "@chakra-ui/react";

interface HeadingStyle {
  headingText: string;
  headingSize: string;
  headingAlign: boolean;
}

const HeadingType: React.FC<HeadingStyle> = ({ headingText, headingAlign, headingSize }) => {
  return (
    <Heading
      mt={2}
      size={headingSize}
      fontFamily="monospace"
      textAlign={headingAlign ? "center" : "start"}
    >
      {headingText}
    </Heading>
  );
};

export default HeadingType;
