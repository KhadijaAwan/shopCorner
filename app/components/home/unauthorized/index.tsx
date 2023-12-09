import { Flex } from "@chakra-ui/react";

interface unauthorizeProps {
  label: string;
}

const Unauthorized: React.FC<unauthorizeProps> = ({ label }) => {
  return (
    <Flex
      width="100%"
      height="350px"
      alignItems="center"
      justifyContent="center"
      fontFamily="monospace"
      fontSize="md"
    >
      {label}
    </Flex>
  );
};

export default Unauthorized;
