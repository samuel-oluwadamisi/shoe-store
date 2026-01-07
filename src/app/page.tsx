import { Metadata } from "next";
import { products } from "@/data/products";
import { NewArrivalsClient } from "@/components/home/new-arrivals-client";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Reviews } from "@/components/home/reviews";
import { Footer } from "@/components/layout/footer";

export const revalidate = 300; // 5 minutes

export const metadata: Metadata = {
  title: "KOKO Walkers | Premium Custom Footwear",
  description: "Experience the pinnacle of custom footwear. Luxury designs, unparalleled comfort, and sustainable craftsmanship by KOKO Walkers.",
};

export default async function Home() {
  const initialNewArrivals = products.slice(0, 3);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <Hero />
      <NewArrivalsClient initialProducts={initialNewArrivals} />
      <Features />
      <Reviews />
      <Footer />
    </main>
  );
}
