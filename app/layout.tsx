import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Header from "./components/header";
import Footer from "./components/footer";
import GlobalState from "@/provider/cartProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Generated by create next app",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ChakraProvider cssVarsRoot={undefined}>
          <Toaster
            toastOptions={{
              style: {
                background: "black",
                color: "white",
              },
            }}
          />
          <GlobalState>
            <Header />
            <Box width="100%" pt="70px">
              <main>{children}</main>
            </Box>
            <Footer />
          </GlobalState>
        </ChakraProvider>
      </body>
    </html>
  );
}
