import { Flex } from "@chakra-ui/react";

interface IconProps {
  label: string;
  background: string;
  color: string;
}

const IconArrange: React.FC<IconProps> = ({
  label,
  background,
  color,
}) => {
  return (
    <Flex bg={background} color={color} borderRadius="lg" p={2} justifyContent="center">
      {label}
    </Flex>
  );
};

export default IconArrange;
