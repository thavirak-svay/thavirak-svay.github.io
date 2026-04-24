import type { Metadata } from "next";
import { Instrument_Serif, Karla } from "next/font/google";
import "./globals.css";
import { calculateExperienceYears } from "../components/template2/utils/helpers";
import { FaviconAnimator } from "../components/FaviconAnimator";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Thavirak Svay - Backend Engineer",
  description: `Backend Developer with ${calculateExperienceYears()}+ Years building scalable distributed systems and microservices across fintech, banking, e-commerce, and healthcare.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${instrumentSerif.variable} ${karla.variable} antialiased`}>
      <body className="antialiased" suppressHydrationWarning>
        <FaviconAnimator />
        {children}
      </body>
    </html>
  );
}
