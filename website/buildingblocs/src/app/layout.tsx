import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["400", "500", "600", "700"],
});

// SEO

export const metadata: Metadata = {
    title: "Percepta - AI-Powered Visual Aid for the Visually Impaired",
    description:
        "Advanced AI camera system and community safety mapping for the visually impaired. Real-time hazard detection and navigation assistance.",
    keywords: [
        "visual aid",
        "AI",
        "camera",
        "accessibility",
        "hazard detection",
        "navigation",
        "visually impaired",
        "safety",
    ],
    authors: [{ name: "Percepta" }],
    viewport: "width=device-width, initial-scale=1",
    robots: "index, follow",
    icons: {
        icon: "icons/favicon.ico",
    },
    openGraph: {
        title: "Percepta - AI Visual Aid System",
        description:
            "AI-powered camera and mapping system for the visually impaired",
        type: "website",
        locale: "en_US",
    },
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
