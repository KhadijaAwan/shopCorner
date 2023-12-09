"use client";

import { CartProvider } from "@/context/cartContext";

interface CartProviderProps {
  children: React.ReactNode;
}

const GlobalState: React.FC<CartProviderProps> = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default GlobalState;
