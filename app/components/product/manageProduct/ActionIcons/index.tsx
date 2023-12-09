import { Box, Button } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface ActionProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  enable?: boolean;
  icon: IconType;
  color: string;
}

const ActionIcons: React.FC<ActionProps> = ({
  onClick,
  enable,
  icon: Icon,
  color,
}) => {
  return (
    <Box p={2}>
      <Button onClick={onClick} disabled={enable}>
        <Icon size={18} style={{ color: color }} />
      </Button>
    </Box>
  );
};

export default ActionIcons;
