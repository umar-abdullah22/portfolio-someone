import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";

import "@/app/globals.css";

import { AnimatedCursor } from "@/components/animated-cursor";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ThemeProvider } from "@/components/theme-provider";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const displayFont = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Momna Zaheer | UI/UX & Graphic Designer",
  description:
    "Premium portfolio of Momna Zaheer, UI/UX and visual designer creating digital products and visual systems."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable} font-sans`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            <AnimatedCursor />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
