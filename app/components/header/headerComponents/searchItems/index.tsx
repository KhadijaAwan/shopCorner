"use client";

import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import queryString from "query-string";

const SearchItems = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchItem: "",
    },
  });

  const submitForm: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    if (!data.searchItem) return router.push("/");

    const getURL = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: data.searchItem,
        },
      },
      { skipNull: true }
    );

    router.push(getURL);
    reset();
  };

  return (
    <>
      <InputGroup ml={{ base: "0", md: "60px" }}>
        <InputLeftAddon
          height="32px"
          width="36px"
          px="10px"
          color="gray.600"
          border="none"
          onClick={handleSubmit(submitForm)}
        >
          <SearchIcon />
        </InputLeftAddon>
        <Input
          border="none"
          bg="gray.100"
          placeholder="Search"
          size="sm"
          width="300px"
          type="text"
          borderTopRightRadius="lg"
          borderBottomRightRadius="lg"
          {...register("searchItem")}
        />
      </InputGroup>
    </>
  );
};

export default SearchItems;
