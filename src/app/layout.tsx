import { ReactNode } from "react";
import type { Metadata } from "next";
import { Footer, Header } from "@/source/components/site";
import "./globals.css";
import "./layout.css";

export const metadata: Metadata = {
  title: "React Accessibile Navigation Demo",
  description: "Examples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Accessible React Navigation Component Demo</title>
      </head>
      <body className="">
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
