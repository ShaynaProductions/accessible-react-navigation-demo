import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

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
        <title>Accessible React Navigatio Component</title>
      </head>
      <body className="">
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
