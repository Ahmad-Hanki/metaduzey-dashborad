import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metaduzey Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-white" lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
