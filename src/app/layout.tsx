import React from "react";
import type { Metadata } from "next";
import { Footer, Header } from "@/folio";
import "./globals.css";
import "./layout.css";

export const metadata: Metadata = {
    title: "React Accessible Navigation Demo",
    description: "Examples",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <title>{metadata.title as string}</title>
        </head>
        <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
