"use client";
import { Button, Icon } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

interface SetButton {
  buttonName: any;
  buttonWidth: any;
  buttonClick: any;
  bgColor: string;
  textColor: any;
  hoverBgColor: string;
  hoverTextColor: string;
}

const LeftButton: React.FC<SetButton> = ({
  buttonName,
  buttonWidth,
  buttonClick,
  bgColor,
  textColor,
  hoverBgColor,
  hoverTextColor,
}) => {
  return (
    <Button
      width={buttonWidth}
      onClick={buttonClick}
      bg={bgColor}
      color={textColor}
      fontWeight="medium"
      fontSize="14px"
      leftIcon={<FcGoogle size={20} />}
      _hover={{ bg: hoverBgColor, color: hoverTextColor }}
    >
      {buttonName}
    </Button>
  );
};

export default LeftButton;
