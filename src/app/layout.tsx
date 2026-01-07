import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google"; // Changed from Geist
import "./globals.css";
import Providers from "@/components/providers/query-client-provider";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "sonner";
import { NavigationLoader } from "@/components/layout/navigation-loader";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KOKO Walkers | Premium Custom Footwear",
    template: "%s | KOKO Walkers"
  },
  description: "Experience the pinnacle of custom footwear. Luxury designs, unparalleled comfort, and sustainable craftsmanship by KOKO Walkers.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
  keywords: ["custom shoes", "luxury sneakers", "KOKO Walkers", "premium footwear", "handcrafted shoes"],
  authors: [{ name: "KOKO Team" }],
  openGraph: {
    title: "KOKO Walkers | Premium Custom Footwear",
    description: "Experience the pinnacle of custom footwear. Luxury designs, unparalleled comfort, and sustainable craftsmanship.",
    type: "website",
    siteName: "KOKO Walkers",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${inter.variable} font-sans antialiased`}
      >
        <Providers>
          <CartProvider>
            <NavigationLoader />
            {children}
            <Toaster />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
