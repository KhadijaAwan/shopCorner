"use client";

import { useCart } from "@/context/cartContext";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "../checkoutForm";
import GetButton from "../../getButton";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutData = () => {
  const router = useRouter();
  const { cartProducts, handlePayment, paymentIntent } = useCart();
  const [loadState, setLoadState] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);

  console.log("Payment Method: ", paymentIntent);
  console.log("Client Secret: ", clientSecret);

  useEffect(() => {
    if (cartProducts) {
      setLoadState(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((response) => {
          setLoadState(false);

          if (response.status === 401) {
            return router.push("/login");
          }

          return response.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handlePayment(data.paymentIntent.id);
          console.log("client payment id : ", data.paymentIntent.client_secret);
        })
        .catch((error) => {
          setError(true);
          toast.error("Error", error);
        });
    }
  }, [cartProducts, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handlePaymentDone = useCallback((value: boolean) => {
    setPaymentDone(value);
    console.log("Payment Status: ", paymentDone);
  }, []);

  return (
    <Box width="100%">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handlePaymentDone={handlePaymentDone}
          />
        </Elements>
      )}

      {loadState && (
        <Flex
          width="300px"
          mx="auto"
          height="150px"
          alignItems="center"
          justifyContent="center"
          fontSize="md"
          fontFamily="monospace"
          color="purple"
          fontWeight="bold"
        >
          Loading CheckoutPage
        </Flex>
      )}

      {error && (
        <Flex
          width="300px"
          mx="auto"
          height="150px"
          alignItems="center"
          justifyContent="center"
          fontSize="md"
          fontFamily="monospace"
          color="purple"
          fontWeight="bold"
        >
          Something went Wrong!!!
        </Flex>
      )}

      {paymentDone && (
        <Flex width="300px" mx="auto" direction="column" height="300px" py={20}>
          <Text mb={7} fontFamily="monospace" fontSize="md">
            Your Payment is Done
          </Text>
          <GetButton
            buttonName="View Orders"
            buttonWidth="200px"
            buttonClick={() => router.push("/orders")}
            bgColor="Purple"
            textColor="white"
            hoverBgColor="purple.700"
            hoverTextColor="white"
          />
        </Flex>
      )}
    </Box>
  );
};

export default CheckoutData;
