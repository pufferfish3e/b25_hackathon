import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Building Blocs",
    description: "3D STL Viewer and Design Platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css"
                />
            </head>
            <body className={`${inter.variable} antialiased font-sans`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
