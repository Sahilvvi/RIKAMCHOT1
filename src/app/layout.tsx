import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WishlistProvider } from "@/components/wishlist/wishlist-context";
import { OrderProvider } from "@/components/orders/order-context";
import { PageTransition } from "@/components/layout/page-transition";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { AmbientMotion } from "@/components/layout/ambient-motion";
import { AuthProvider } from "@/components/auth/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RIKAMCHOT — Premium Fashion, Tech & Lifestyle Marketplace",
  description:
    "A visually-led, interactive multi-category marketplace. Discover, explore, customize and purchase products from curated sellers.",
  openGraph: {
    title: "RIKAMCHOT — Premium Fashion, Tech & Lifestyle Marketplace",
    description: "Discover, explore, customize and purchase products from curated sellers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background pb-16 text-foreground md:pb-0">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <Header />
              <ScrollProgress />
              <AmbientMotion />
              <PageTransition>{children}</PageTransition>
              <CustomCursor />
              <CartDrawer />
              <Footer />
              <MobileNav />
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
