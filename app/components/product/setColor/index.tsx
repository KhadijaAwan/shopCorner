import { useCallback, useEffect, useState } from "react";
import { ProductImageFormat } from "../addProduct";
import { Box, Checkbox, Text } from "@chakra-ui/react";
import SelectImage from "../selectImage";
import GetButton from "../../getButton";

interface SetColorProps {
  picture: ProductImageFormat;
  addPhoto: (value: ProductImageFormat) => void;
  removePhoto: (value: ProductImageFormat) => void;
  productAdded: boolean;
}

const SetColors: React.FC<SetColorProps> = ({
  picture,
  addPhoto,
  removePhoto,
  productAdded,
}) => {
  const [selected, setSelected] = useState(false);
  const [fileDownload, setFileDownload] = useState<File | null>(null);

  useEffect(() => {
    if (productAdded) {
      setSelected(false);
      setFileDownload(null);
    }
  }, [productAdded]);

  const handlePhoto = useCallback((value: File) => {
    setFileDownload(value);
    addPhoto({ ...picture, choosenImg: value });
  }, [addPhoto, picture]);

  const handleCheck = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(event.target.checked);
      if (!event.target.checked) {
        setFileDownload(null);
        removePhoto(picture);
      }
    },
    [removePhoto, picture]
  );

  return (
    <Box>
      <Checkbox
        fontSize="14px"
        fontFamily="monospace"
        checked={selected}
        onChange={handleCheck}
        colorScheme="purple"
      >
        {picture.colorName}
      </Checkbox>
      {selected && !fileDownload && <SelectImage item={picture} handlePhoto={handlePhoto} />}

      {fileDownload && (
        <Box mt={4}>
          <Text fontSize="14px" fontFamily="monospace" mb={2} textAlign="center">{fileDownload?.name}</Text>
          <GetButton
            buttonName="Cancel"
            buttonWidth="100px"
            buttonClick={() => {
              setFileDownload(null);
              removePhoto(picture);
            }}
            bgColor="white"
            textColor="Purple"
            hoverBgColor="white"
            hoverTextColor="purple.700"
          />
        </Box>
      )}
    </Box>
  );
};

export default SetColors;
