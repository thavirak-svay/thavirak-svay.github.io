import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { experienceYears } from "@/components/portfolio/content";

const display = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body",
});

const title = "Thavirak Svay, Backend Developer";
const description = `Software developer in Phnom Penh with ${experienceYears()}+ years of experience across frontend and backend, now focused on backend engineering. Currently on Wing Bank’s platform team, working on Java and Spring Boot microservices, account security and the WSO2 API gateway.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://thavirak-svay.github.io"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Thavirak Svay",
    title,
    description,
  },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = { themeColor: "#f9fafc" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
