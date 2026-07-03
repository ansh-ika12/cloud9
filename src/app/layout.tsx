import type { Metadata } from "next";
import { Rubik_Bubbles, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const rubikBubbles = Rubik_Bubbles({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik-bubbles",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cloud9",
  description:
    "Debug, practice, and understand code with an AI mentor that adapts to how you learn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rubikBubbles.variable} ${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-[var(--ink)] bg-[var(--surface-alt)]">
        {children}
      </body>
    </html>
  );
}