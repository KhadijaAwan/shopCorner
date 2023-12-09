"use client";
import { Box, Text, SimpleGrid, Center } from "@chakra-ui/react";
import HeadingType from "../../headingType";
import InputText from "../../inputContent/inputText";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import {
  addProductFields,
  productCategories,
  productColors,
} from "@/app/utils/title";
import TextAreaContent from "../../inputContent/textAreaContent";
import CheckBoxContent from "../../inputContent/checkBoxContent";
import CategoriesContent from "../../inputContent/categoryContent";
import SetColors from "../setColor";
import GetButton from "../../getButton";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "../../../../helper/firebase";
import { useRouter } from "next/navigation";

export type ProductImageFormat = {
  colorName: string;
  colorCode: string;
  choosenImg: File | null;
};

export type ProductImageUpload = {
  colorName: string;
  colorCode: string;
  choosenImg: string;
};

const AddProductItems = () => {
  const [load, setLoad] = useState(false);
  const [productCreate, setProductCreate] = useState(false);
  const [photo, setPhoto] = useState<ProductImageFormat[] | null>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      rating: 0,
      brand: "",
      category: "",
      inStock: false,
      photo: [],
    },
  });

  console.log("Photo is ", photo);

  const category = watch("category");

  useEffect(() => {
    setConstantValue("photo", photo);
  }, [photo]);

  useEffect(() => {
    if (productCreate) {
      reset();
      setPhoto(null);
      setProductCreate(false);
      router.refresh();
    }
  }, [productCreate]);

  const submitData: SubmitHandler<FieldValues> = async (data) => {
    console.log("data is ", data);
    setLoad(true);
    let uploadedImages: ProductImageUpload[] = [];

    if (!data.category) {
      setLoad(false);
      toast.error("Product Category is not selected");
    }

    if (!data.photo || data.photo.length === 0) {
      setLoad(false);
      toast.error("Product Image is not uploaded");
    }

    const handleImageUploads = async () => {
      try {
        for (const i of data.photo) {
          if (i.choosenImg) {
            const fileName = new Date().getTime() + "-" + i.choosenImg.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, i.choosenImg);
            console.log("Image is", i.choosenImg);
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error in Uploading Image in Firebase", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...i,
                        choosenImg: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error in Getting Download Image URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
        // toast.success("Product Added Successfully!");
      } catch (error) {
        setLoad(false);
        console.log("Error in Uploading Image in Firebase", error);
        toast.error("Firebase Image Upload Error");
      }
    };

    await handleImageUploads();
    const addedProduct = {
      ...data,
      rating: parseInt(data.rating, 10),
      price: parseInt(data.price, 10),
      photo: uploadedImages,
    };

    axios
      .post("/api/product", addedProduct)
      .then(() => {
        console.log("product is ", addedProduct);
        toast.success("Product Added Successfully!");
        setProductCreate(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoad(false);
        console.log("Producted Added is ", addedProduct);
      });
  };

  const addPhoto = useCallback((value: ProductImageFormat) => {
    setPhoto((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removePhoto = useCallback((value: ProductImageFormat) => {
    setPhoto((prev) => {
      if (prev) {
        const removePictures = prev.filter(
          (item: any) => item.colorName === value.colorName
        );
        return removePictures;
      }

      return prev;
    });
  }, []);

  const setConstantValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <Box py={10} mx="auto" width={{ base: "300px", md: "400px" }}>
      <HeadingType
        headingText="Add Product"
        headingSize="lg"
        headingAlign={true}
      />

      <Box my={6}>
        {addProductFields.map((i) => (
          <Box mb={6} key={i.id}>
            {i.type !== "paragraph" ? (
              <InputText
                type={i.type}
                placeholder={i.placeholder}
                label={i.label}
                id={i.id}
                required
                errors={errors}
                register={register}
              />
            ) : (
              <TextAreaContent
                placeholder={i.placeholder}
                label={i.label}
                id={i.id}
                required
                errors={errors}
                register={register}
              />
            )}
          </Box>
        ))}
      </Box>

      <CheckBoxContent
        id={"inStock"}
        label={"Product is in Stock"}
        register={register}
      />

      <Text fontSize="15px" fontFamily="monospace" mt={6}>
        Select Category
      </Text>
      <SimpleGrid
        my={10}
        columns={3}
        spacing={10}
        pl={{base:"4", md:"10"}}
        pr={4}
        width={{ base: "320px", md: "400px" }}
        mx="auto"
      >
        {productCategories.map((p) => (
          <Box key={p.id}>
            <CategoriesContent
              onClick={(category) => setConstantValue("category", category)}
              selected={category === p.id}
              label={p.id}
              icon={p.icon}
            />
          </Box>
        ))}
      </SimpleGrid>

      <Text fontSize="15px" fontFamily="monospace" color="gray.700" my={6}>
        Select Color
      </Text>
      <SimpleGrid
        columns={3}
        spacing={10}
        px={4}
        width={{ base: "300px", md: "400px" }}
        mx="auto"
      >
        {productColors.map((p) => (
          <Box key={p.colorName}>
            <SetColors
              picture={p}
              addPhoto={addPhoto}
              removePhoto={removePhoto}
              productAdded={productCreate}
            />
          </Box>
        ))}
      </SimpleGrid>

      <Box mt="20px" height="40px" width="100%"></Box>

      <Center>
        <GetButton
          buttonName={load ? "Adding Product" : "Add Product"}
          buttonWidth="270px"
          buttonClick={handleSubmit(submitData)}
          bgColor="Purple"
          textColor="white"
          hoverBgColor="purple.700"
          hoverTextColor="white"
        />
      </Center>
    </Box>
  );
};

export default AddProductItems;
