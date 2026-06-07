import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Glass Bottles & Jars Supplier — Custom OEM | HongChong Glass",
    template: "%s | HongChong Glass",
  },
  description:
    "Professional glass container sourcing partner in China's Tongshan Glass Industrial Park. Glass bottles, jars, vases — custom OEM, flexible MOQ, one-stop service. Get a quote today.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
