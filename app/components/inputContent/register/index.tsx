"use client";

import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import HeadingType from "../../headingType";
import { Box, Center, Flex, Text, Link } from "@chakra-ui/react";
import InputText from "../inputText";
import { inputFields } from "@/app/utils/title";
import GetButton from "../../getButton";
import LeftButton from "../../leftButton";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface registerProps {
  user: any;
}

const Register: React.FC<registerProps> = ({ user }) => {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const [socialLoad, setSocialLoad] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    setLoad(true);
    console.log(data);

    axios
      .post("api/register", data)
      .then(() => {
        toast.success("User Registered Successfully");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Login");
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("Error"))
      .finally(() => {
        setSocialLoad(false);
        setLoad(false);
      });
  };

  return (
    <Box mx="auto" width={{ base: "300px", md: "400px" }} py={16}>
      <HeadingType
        headingText={"Sign Up"}
        headingAlign={true}
        headingSize="2xl"
      />
      <Box mt={8}>
        <LeftButton
          buttonName={load && socialLoad ? "Loading" : "Sign Up with Google"}
          buttonWidth={{ base: "300px", md: "400px" }}
          buttonClick={() => {
            setSocialLoad(true);
            setLoad(true);
            signIn("google");
            router.push("/");
          }}
          bgColor="Green"
          textColor="white"
          hoverBgColor="green.800"
          hoverTextColor="white"
        />
      </Box>
      <Box mb={12} mt={6}>
        {inputFields.map((i) => (
          <Box mb={6} key={i.id}>
            <InputText
              type={i.type}
              placeholder={i.placeholder}
              label={i.label}
              id={i.id}
              required
              errors={errors}
              register={register}
            />
          </Box>
        ))}
      </Box>
      <Center>
        <GetButton
          buttonName={load && !socialLoad ? "Loading" : "Sign Up"}
          buttonWidth="200px"
          buttonClick={handleSubmit(submitForm)}
          bgColor="Purple"
          textColor="white"
          hoverBgColor="purple.700"
          hoverTextColor="white"
        />
      </Center>
      <Flex mt={6} justifyContent="center">
        <Text mr="10px">Already have an account?</Text>
        <Link
          as={NextLink}
          href="/login"
          color="gray.800"
          _hover={{ textTransform: "none", color: "purple" }}
          fontWeight="medium"
        >
          Login
        </Link>
      </Flex>
    </Box>
  );
};

export default Register;
