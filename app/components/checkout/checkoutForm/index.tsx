"use client";

import { useCart } from "@/context/cartContext";
import { Box, Text } from "@chakra-ui/react";
import {
  PaymentElement,
  AddressElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HeadingType from "../../headingType";
import GetButton from "../../getButton";

interface CheckoutDataTypes {
  clientSecret: string;
  handlePaymentDone: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutDataTypes> = ({
  clientSecret,
  handlePaymentDone,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { cartAmount, resetCart, handlePayment } = useCart();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    handlePaymentDone(false);
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    console.log("Handle Submit");
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Successfully");
          resetCart();
          handlePaymentDone(true);
          handlePayment(null);
        }

        setIsLoading(false);
      });
  };

  return (
    <form onClick={handleSubmit} id="payment-form">
      <Box
        width={{ base: "300px", md: "450px", xl: "600px" }}
        mx="auto"
        mb={16}
      >
        <Box mt={10} mb={12}>
          <HeadingType
            headingText={"Order Details"}
            headingSize={"xl"}
            headingAlign={true}
          />
        </Box>
        <Text
          color="purple"
          mb="10px"
          fontWeight="semibold"
          fontSize="16px"
          fontFamily="monospace"
        >
          Payment Details
        </Text>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

        <Text
          color="purple"
          mt="17px"
          mb="10px"
          fontWeight="semibold"
          fontSize="16.5px"
          fontFamily="monospace"
        >
          Address Details
        </Text>
        <AddressElement
          options={{ mode: "shipping", allowedCountries: ["US", "KE"] }}
        />

        <Box mx="auto" width="300px" textAlign="center" mt={10}>
          <Text
            my="20px"
            fontWeight="semibold"
            fontSize="16.5px"
            fontFamily="monospace"
          >
            Amount ${cartAmount}
          </Text>

          <GetButton
            buttonName={isLoading ? "Processing" : "Pay Now"}
            buttonWidth="200px"
            buttonClick={() => {}}
            bgColor="Purple"
            textColor="white"
            hoverBgColor="purple.700"
            hoverTextColor="white"
          />
        </Box>
      </Box>
    </form>
  );
};

export default CheckoutForm;
