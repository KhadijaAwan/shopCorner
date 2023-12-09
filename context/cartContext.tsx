"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProductCart } from "@/app/components/product/productInfo";
import toast from "react-hot-toast";

type CartType = {
  cartQuantity: number;
  cartAmount: number;
  paymentIntent: string | null;
  cartProducts: ProductCart[] | null;
  handleAddtoCart: (product: ProductCart) => void;
  handleRemovetoCart: (product: ProductCart) => void;
  productIncrease: (product: ProductCart) => void;
  productDecrease: (product: ProductCart) => void;
  resetCart: () => void;
  handlePayment: (value: string | null) => void;
};

export const CartContext = createContext<CartType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartProvider = (props: Props) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartAmount, setCartAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<ProductCart[] | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const productInCart: any = localStorage.getItem("cartItems");
    const cartItems: ProductCart[] | null = JSON.parse(productInCart);
    const ecommercePayment: any = localStorage.getItem("paymentItems");
    const paymentData: string | null = JSON.parse(ecommercePayment);

    setCartProducts(cartItems);
    setPaymentIntent(paymentData);
  }, []);

  useEffect(() => {
    const totalBill = () => {
      if (cartProducts) {
        const { total, quantityNum } = cartProducts?.reduce(
          (accumulator, i) => {
            const totalAmount = i.price * i.quantity;
            accumulator.total += totalAmount;
            accumulator.quantityNum += i.quantity;

            return accumulator;
          },
          {
            total: 0,
            quantityNum: 0,
          }
        );

        setCartQuantity(quantityNum);
        setCartAmount(total);
      }
    };

    totalBill();
  }, [cartProducts]);

  const handleAddtoCart = useCallback((product: ProductCart) => {
    setCartProducts((prev) => {
      let updateCart;
      if (prev) {
        updateCart = [...prev, product];
      } else {
        updateCart = [product];
      }

      toast.success("Product Added in Cart");
      localStorage.setItem("cartItems", JSON.stringify(updateCart));
      return updateCart;
    });
  }, []);

  const handleRemovetoCart = useCallback(
    (product: ProductCart) => {
      if (cartProducts) {
        const removeProduct = cartProducts.filter((p) => p.id === product.id);
        setCartProducts(removeProduct);
        toast.success("Product Removed from Cart");
        localStorage.setItem("cartItems", JSON.stringify(removeProduct));
      }
    },
    [cartProducts]
  );

  const productIncrease = useCallback(
    (product: ProductCart) => {
      if (product.quantity == 50) {
        toast.error("Maximum product limit reached");
      } else {
        let updateCart;
        if (cartProducts) {
          updateCart = [...cartProducts];
          const alreadyPresentProduct = cartProducts.findIndex(
            (item) => item.id === product.id
          );

          if (alreadyPresentProduct > -1) {
            updateCart[alreadyPresentProduct].quantity = ++updateCart[
              alreadyPresentProduct
            ].quantity;
            setCartProducts(updateCart);
            localStorage.setItem("cartItems", JSON.stringify(updateCart));
          }
        }
      }
    },
    [cartProducts]
  );

  const productDecrease = useCallback(
    (product: ProductCart) => {
      if (product.quantity == 1) {
        toast.error("Minimum product limit reached");
      } else {
        let updateCart;
        if (cartProducts) {
          updateCart = [...cartProducts];
          const alreadyPresentProduct = cartProducts.findIndex(
            (item) => item.id === product.id
          );

          if (alreadyPresentProduct > -1) {
            updateCart[alreadyPresentProduct].quantity = --updateCart[
              alreadyPresentProduct
            ].quantity;
            setCartProducts(updateCart);
            localStorage.setItem("cartItems", JSON.stringify(updateCart));
          }
        }
      }
    },
    [cartProducts]
  );

  const resetCart = useCallback(() => {
    setCartProducts(null);
    setCartQuantity(0);
    localStorage.setItem("cartItems", JSON.stringify(null));
  }, [cartProducts]);

  const handlePayment = useCallback(
    (value: string | null) => {
      setPaymentIntent(value);
      localStorage.setItem("paymentItems", JSON.stringify(value));
    },
    [paymentIntent]
  );

  const value = {
    cartQuantity,
    cartProducts,
    cartAmount,
    paymentIntent,
    handleAddtoCart,
    handleRemovetoCart,
    productIncrease,
    productDecrease,
    resetCart,
    handlePayment,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("Error useCart Context Provider");
  }

  return context;
};
